require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const axios = require("axios");
const { Alchemy, Network } = require("alchemy-sdk");
const fs = require("fs");
const path = require("path");

// Load ABI and deployed contract address if you plan to use deposits.
const abiPath = path.join(__dirname, "./abi/DepositWallet.json");

const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
const DepositWallet = contractJson;

const deploymentPath = path.join(__dirname, "../deployment.json");
const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
const CONTRACT_ADDRESS = deployment.address;

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["https://etherscope.vercel.app", "http://localhost:5173"],
  })
);


// Connect to Sepolia via Alchemy for read operations.
const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
});

// Use ethers.js for direct contract reads on Sepolia.
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

// --- Portfolio Balance Endpoint ---
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

// --- Transactions Endpoint (Etherscan API) ---
app.get("/api/transactions/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const response = await axios.get("https://api-sepolia.etherscan.io/api", {
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

// --- Deposit Events (from contract, if deployed) ---
app.get("/api/deposits/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      DepositWallet.abi,
      provider
    );
    const filter = contract.filters.Deposit();
    const latestBlock = await provider.getBlockNumber();
    const startBlock = Math.max(0, latestBlock - 5000); // Check only the last 5000 blocks

    let allEvents = [];
    let fromBlock = startBlock;
    const batchSize = 500;

    while (fromBlock <= latestBlock) {
      const toBlock = Math.min(fromBlock + batchSize - 1, latestBlock);
      const batchEvents = await contract.queryFilter(
        filter,
        fromBlock,
        toBlock
      );
      allEvents = allEvents.concat(batchEvents);
      fromBlock = toBlock + 1;
    }

    const events = allEvents.filter(
      (event) => event.args.from.toLowerCase() === address.toLowerCase()
    );
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch deposit events" });
  }
});

// --- Start the backend server ---
app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
