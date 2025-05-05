const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/plaid`;

/**
 * Fetches the net worth from the API
 * @returns Net worth data
 */
const getNetWorth = async () => {
  const response = await fetch(`${API_URL}/net-worth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const networthService = {
  getNetWorth,
};
