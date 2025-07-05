const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to local Ganache blockchain
const provider = new ethers.JsonRpcProvider("http://ganache:8545");


// Test route to get latest block number
app.get('/api/block', async (req, res) => {
  try {
    const blockNumber = await provider.getBlockNumber();
    res.json({ blockNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch block number' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
