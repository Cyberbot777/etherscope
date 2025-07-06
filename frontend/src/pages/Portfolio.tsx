import { useEffect, useState } from "react";
import { getPortfolio, getTransactions, getDeposits } from "../api/walletApi";
import { useAccount } from "wagmi";
import PageWrapper from "../components/PageWrapper";

interface PortfolioData {
  [key: string]: unknown;
}

interface TransactionData {
  [key: string]: unknown;
}

interface DepositData {
  [key: string]: unknown;
}

export default function Portfolio() {
  const { address, isConnected } = useAccount();

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData | null>(null);
  const [deposits, setDeposits] = useState<DepositData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) {
      setPortfolio(null);
      setTransactions(null);
      setDeposits(null);
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const [portfolioData, transactionsData, depositsData] = await Promise.all([
          getPortfolio(address),
          getTransactions(address),
          getDeposits(address),
        ]);
        setPortfolio(portfolioData);
        setTransactions(transactionsData);
        setDeposits(depositsData);
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        setPortfolio(null);
        setTransactions(null);
        setDeposits(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <PageWrapper>
        <h1 className="text-3xl font-bold">Portfolio Page</h1>
        <p className="mt-4">Please connect your wallet to view portfolio data.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold">Portfolio Page</h1>
      <p className="mt-4">
        This page will show wallet balances, deposits, and transaction history.
      </p>

      {loading ? (
        <div className="mt-8">Loading data...</div>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Portfolio Data</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(portfolio, null, 2)}
          </pre>

          <h2 className="text-xl font-semibold mt-6 mb-2">Transactions</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(transactions, null, 2)}
          </pre>

          <h2 className="text-xl font-semibold mt-6 mb-2">Deposits</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(deposits, null, 2)}
          </pre>
        </div>
      )}
    </PageWrapper>
  );
}
