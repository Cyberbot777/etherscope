const API_BASE_URL = "http://localhost:4000/api";

export async function getPortfolio(address: string) {
  const response = await fetch(`${API_BASE_URL}/portfolio/${address}`);
  if (!response.ok) {
    throw new Error("Failed to fetch portfolio data");
  }
  return response.json();
}

export async function getTransactions(address: string) {
  const response = await fetch(`${API_BASE_URL}/transactions/${address}`);
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
}

export async function getDeposits(address: string) {
  const response = await fetch(`${API_BASE_URL}/deposits/${address}`);
  if (!response.ok) {
    throw new Error("Failed to fetch deposits");
  }
  return response.json();
}
