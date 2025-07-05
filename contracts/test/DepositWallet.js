const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DepositWallet", function () {
  let depositWallet;
  let owner;

  beforeEach(async function () {
    const DepositWallet = await ethers.getContractFactory("DepositWallet");
    depositWallet = await DepositWallet.deploy();
    await depositWallet.waitForDeployment();
    [owner] = await ethers.getSigners();
  });

  it("should accept ETH deposits", async function () {
    const depositAmount = ethers.parseEther("1.0");

    const tx = await owner.sendTransaction({
      to: depositWallet.target,
      value: depositAmount,
    });

    await tx.wait();

    const balance = await ethers.provider.getBalance(depositWallet.target);
    expect(balance).to.equal(depositAmount);
  });
});
