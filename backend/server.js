require("dotenv").config();

const express = require("express");
const { ethers } = require("ethers");
const axios = require("axios");
const { Alchemy, Network } = require("alchemy-sdk");
const fs = require("fs");
const path = require("path");

// Load ABI
const abiPath = path.join(__dirname, "../artifacts/contracts/DepositWallet.sol/DepositWallet.json");
const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
const DepositWallet = contractJson;

// Load deployed address from deployment.json
const deploymentPath = path.join(__dirname, "../deployment.json");
const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
const CONTRACT_ADDRESS = deployment.address;

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to local Hardhat node
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Connect to Alchemy
const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

// Get latest block number from local node
app.get("/api/block", async (req, res) => {
  try {
    const blockNumber = await provider.getBlockNumber();
    res.json({ blockNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch block number" });
  }
});

// Get block details by block number
app.get("/api/block/:number", async (req, res) => {
  try {
    const blockNumber = parseInt(req.params.number);
    const block = await provider.getBlock(blockNumber);
    res.json(block);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch block" });
  }
});

// Get ETH balance via Alchemy
app.get("/api/portfolio/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const balance = await alchemy.core.getBalance(address);
    const ethBalance = ethers.formatEther(balance.toString());
    res.json({ address, ethBalance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch wallet balance" });
  }
});

// Get transaction history via Etherscan
app.get("/api/transactions/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "txlist",
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: "desc",
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Get deposit events from DepositWallet contract
app.get("/api/deposits/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, DepositWallet.abi, provider);

    const filter = contract.filters.Deposit();
    const allEvents = await contract.queryFilter(filter, 0, "latest");
    const events = allEvents.filter(event => event.args.from.toLowerCase() === address.toLowerCase());

    console.log("\n=== All Events ===");
    allEvents.forEach(event => {
      console.log({
        from: event.args.from,
        amount: ethers.formatEther(event.args.amount.toString()) + " ETH",
      });
    });

    console.log("\n=== Filtered Events ===");
    console.log(events);

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch deposit events" });
  }
});

// Start backend server
app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
