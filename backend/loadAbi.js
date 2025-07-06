const fs = require('fs');
const path = require('path');

// Path to the ABI JSON file relative to the backend folder
const abiPath = path.join(__dirname, '../artifacts/contracts/DepositWallet.sol/DepositWallet.json');

// Load and parse the ABI file
const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const abi = contractJson.abi;

// Output the ABI to verify it works
console.log("Loaded ABI:", abi);
