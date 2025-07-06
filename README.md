
# Web3 Wallet Portfolio Dashboard

This is a full-stack decentralized application (dApp) for analyzing Ethereum wallet portfolios.  
It combines Solidity smart contracts, a Node.js backend, and a React frontend to deliver a production-ready wallet analytics tool.

---

## Features

- Wallet connection via **MetaMask** and **WalletConnect**.
- Smart Contract for deposits and on-chain portfolio tracking.
- Real-time token balances and transaction history via Web3 APIs.
- Switch between **local blockchain** (Hardhat) and **Ethereum testnets**.
- Clean, dark, and responsive UI built with **React**, **Vite**, and **Tailwind CSS**.
- Integrated **portfolio dashboard** and **wallet monitoring** pages.
- Fully Dockerized backend and local blockchain for easy development.

---

## Tech Stack

| Layer           | Tools / Technologies                          |
| --------------- | --------------------------------------------- |
| Smart Contracts | Solidity, Hardhat, Hardhat Node (local blockchain) |
| Backend API     | Node.js, Ethers.js, Express, Docker           |
| Frontend        | React, Vite, Tailwind CSS, Wagmi, RainbowKit  |
| Blockchain APIs | Alchemy, Etherscan, The Graph                  |

---

## Key Highlights

- Full smart contract lifecycle: Write → Test → Deploy.
- Wallet-based authentication (no passwords or centralized logins).
- Real blockchain analysis and token portfolio visualization.
- Modern navigation with **Home**, **Portfolio**, and **Wallet** pages.
- Developer-friendly: easily toggle between local and testnet modes.
- Dockerized backend and blockchain for consistent, reproducible development.

---

## Development Workflow (Recommended, No Docker)

### 1. Start Local Blockchain (Hardhat Node)

```bash
cd wallet-portfolio-dashboard
npx hardhat node
```

### 2. Deploy Smart Contract (DepositWallet) to Local Node

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Run Backend API (Node.js)

```bash
cd backend
node server.js
```

Your backend API will run at `http://localhost:4000`.

### 4. Run Contract Tests (Optional)

```bash
npx hardhat test
```

### 5. Send ETH to Contract (Example Script)

```bash
npx hardhat run scripts/sendDeposit.js --network localhost
```

### 6. API Endpoints

- `/api/block` → Latest block number.
- `/api/block/:number` → Block details.
- `/api/portfolio/:address` → ETH balance via Alchemy.
- `/api/transactions/:address` → Transaction history via Etherscan.
- `/api/deposits/:address` → Deposit events from the smart contract.

---

## Screenshots

### Smart Contract Test Screenshot
![Smart Contract Test Screenshot](docs/successfull-test.png)

### Frontend — Wallet Dashboard (React + Vite + Tailwind CSS)
![Frontend Screenshot](docs/frontend.png)

---

## Author

Created and maintained by [Cyberbot777](https://github.com/Cyberbot777).

---

### Notes:

- Always run backend from **inside** the `/backend` folder.
- Do not run backend using `node backend/server.js` from root — run it after `cd backend`.
- Frontend uses **Vite** for rapid development — run from `/frontend` directory.
