import PageWrapper from "../components/PageWrapper";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Wallet() {
  const { address, isConnected } = useAccount();

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold">Wallet Page</h1>
      <p className="mt-4">
        This is where users will connect their wallet and interact with smart contracts.
      </p>
      <div className="mt-8">
        {/* Show Connect button if not connected */}
        {!isConnected ? (
          <div className="mb-4">
            <ConnectButton />
            <p className="mt-2 text-sm text-gray-400">
              Please connect your wallet using the button above.
            </p>
          </div>
        ) : (
          // Show connected wallet address
          <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700">
            <span className="font-mono text-base">Connected wallet:</span>
            <div className="text-lg font-semibold mt-2 break-all">{address}</div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
