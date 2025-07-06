const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("DepositWallet", function () {
  it("should accept ETH deposits", async function () {
    const [owner] = await ethers.getSigners();
    const DepositWallet = await ethers.getContractFactory("DepositWallet");
    const depositWallet = await DepositWallet.deploy();

    const depositAmount = ethers.parseEther("1.0");

    const tx = await owner.sendTransaction({
      to: depositWallet.target,
      value: depositAmount,
    });

    await tx.wait();

    const balance = await depositWallet.getBalance();
    expect(balance).to.equal(depositAmount);
  });
});
