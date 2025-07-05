const hre = require("hardhat");

async function main() {
  const DepositWallet = await hre.ethers.getContractFactory("DepositWallet");
  const depositWallet = await DepositWallet.deploy();

  await depositWallet.waitForDeployment();

  console.log("DepositWallet deployed to:", depositWallet.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

