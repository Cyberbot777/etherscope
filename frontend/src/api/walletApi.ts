const API_BASE_URL = import.meta.env.VITE_API_URL;


// Generic fetch helper for all wallet endpoints
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Error ${response.status}: ${message}`);
  }
  return response.json();
}

export function getPortfolio(address: string) {
  return fetchApi(`/portfolio/${address}`);
}

export function getTransactions(address: string) {
  return fetchApi(`/transactions/${address}`);
}

export function getDeposits(address: string) {
  return fetchApi(`/deposits/${address}`);
}
