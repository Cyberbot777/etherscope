import { useEffect, useState } from "react";
import { getPortfolio, getTransactions, getDeposits } from "../api/walletApi";
import PageWrapper from "../components/PageWrapper";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [deposits, setDeposits] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = "YOUR_TEST_WALLET_ADDRESS"; // Replace this later with actual wallet address
        const portfolioData = await getPortfolio(address);
        const transactionsData = await getTransactions(address);
        const depositsData = await getDeposits(address);
        setPortfolio(portfolioData);
        setTransactions(transactionsData);
        setDeposits(depositsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold">Portfolio Page</h1>
      <p className="mt-4">
        This page will show wallet balances, deposits, and transaction history.
      </p>

      {/* Data Display (Minimal, Temporary) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Portfolio Data (Test)</h2>
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(portfolio, null, 2)}
        </pre>

        <h2 className="text-xl font-semibold mt-6 mb-2">Transactions (Test)</h2>
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(transactions, null, 2)}
        </pre>

        <h2 className="text-xl font-semibold mt-6 mb-2">Deposits (Test)</h2>
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(deposits, null, 2)}
        </pre>
      </div>
    </PageWrapper>
  );
}
