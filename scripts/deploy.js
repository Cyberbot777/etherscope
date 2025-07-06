const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const DepositWallet = await hre.ethers.getContractFactory("DepositWallet");
  const depositWallet = await DepositWallet.deploy();

  console.log(`DepositWallet deployed to: ${depositWallet.target}`);

  // Save deployed address to deployment.json
  const deploymentInfo = {
    address: depositWallet.target,
    network: hre.network.name,
  };

  const filePath = path.join(__dirname, "../deployment.json");
  fs.writeFileSync(filePath, JSON.stringify(deploymentInfo, null, 2));

  console.log(`Deployment info saved to ${filePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
