
# Web3 Wallet Portfolio Dashboard

This is a full-stack decentralized application (dApp) for analyzing Ethereum wallet portfolios.  
It combines Solidity smart contracts, a Node.js backend, and a React frontend to deliver a production-ready wallet analytics tool.

---

## Features

- Wallet connection via **MetaMask** and **WalletConnect**.
- Smart Contract for deposits and on-chain portfolio tracking.
- Real-time token balances and transaction history via Web3 APIs.
- Switch between **local blockchain** (Ganache) and **Ethereum testnets**.
- Clean, responsive UI built with **React**, **Vite**, and **Tailwind CSS**.
- Fully Dockerized backend and local blockchain for easy development.

---

## Tech Stack

| Layer           | Tools / Technologies                          |
| --------------- | --------------------------------------------- |
| Smart Contracts | Solidity, Hardhat, Ganache (local blockchain) |
| Backend API     | Node.js, Ethers.js, Express, Docker           |
| Frontend        | React, Vite, Tailwind CSS, Wagmi, RainbowKit  |
| Blockchain APIs | Alchemy, Covalent, The Graph                  |

---

## Key Highlights

- Full smart contract lifecycle: Write → Test → Deploy.
- Wallet-based authentication (no passwords or centralized logins).
- Real blockchain analysis and token portfolio visualization.
- Developer-friendly: easily toggle between local and testnet modes.
- Dockerized backend and blockchain for consistent, reproducible development.

---

## Dockerized Development Workflow

### 1. Start Local Blockchain (Ganache)
```
docker compose up ganache
```

### 2. Build & Run Backend API
```
cd backend
docker build -t wallet-backend .
docker run -p 4000:4000 wallet-backend
```

### 3. Deploy Smart Contract (DepositWallet) to Ganache
```
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network ganache
```

### 4. Run Contract Tests
```
cd contracts
npx hardhat test
```

---

## Tests

Example smart contract test result (DepositWallet contract on local Ganache network):

![Smart Contract Test Screenshot](docs/successfull-test.png)


---

## Author

Created and maintained by [Cyberbot777](https://github.com/Cyberbot777).
