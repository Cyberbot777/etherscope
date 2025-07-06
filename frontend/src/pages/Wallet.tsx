import PageWrapper from "../components/PageWrapper";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Wallet() {
  const { address, isConnected } = useAccount();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div
          className="bg-zinc-900/90 rounded-2xl shadow-2xl border border-zinc-800 px-8 py-10 w-full max-w-md flex flex-col items-center"
          style={{ boxShadow: "0 4px 48px 0 rgba(87,128,255,0.18)" }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 animate-pulse">
            EtherScope
          </h1>

          <p className="text-zinc-300 mb-8 text-center">
            Connect your wallet to get started and interact with smart
            contracts.
          </p>
          {!isConnected ? (
            <div className="w-full flex justify-center">
              <div className="shadow-lg rounded-xl">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 w-full mt-4 text-center shadow-lg">
              <span className="font-mono text-base text-zinc-400">
                Connected wallet:
              </span>
              <div className="text-lg font-semibold mt-2 break-all">
                {address}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
