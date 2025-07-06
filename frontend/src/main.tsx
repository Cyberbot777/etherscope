import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Set up the Wagmi config using the modern v2 pattern:
const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/QLFJdf6-a0cclbDNFaUsE"),
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/QLFJdf6-a0cclbDNFaUsE"),
  },
  // If you want to add autoConnect, connectors, etc, you can add here.
  // For basic usage, this is enough.
});

// Set up React Query Client (required by Wagmi v2+)
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
