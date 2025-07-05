// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DepositWallet {
    event Deposit(address indexed from, uint256 amount);

    // Fallback function to receive Ether
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Returns the contract's ETH balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
