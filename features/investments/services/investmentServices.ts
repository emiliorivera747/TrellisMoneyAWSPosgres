import { API_URL } from "@/utils/global-variables/globals";

const fetchInvestments = async () => {
  const timestamp = new Date().toISOString();
  console.log(`Fetch Investments called at: ${timestamp}`);
  const res = await fetch(`${API_URL}/plaid/investments/holdings`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ timestamp }),
  });
  if (!res.ok) {
    throw new Error("Error fetching investment holdings data");
  }
  const data = await res.json();
  return data;
};

export const investmentService = {
  fetchInvestments,
};
