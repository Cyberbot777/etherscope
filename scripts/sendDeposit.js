const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const contractJson = require("../artifacts/contracts/DepositWallet.sol/DepositWallet.json");
  const deployment = require("../deployment.json");
  const contract = new hre.ethers.Contract(deployment.address, contractJson.abi, owner);

  await owner.sendTransaction({
    to: await contract.getAddress(),
    value: hre.ethers.parseEther("1.0")
  });

  console.log("Sent 1 ETH to contract.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
