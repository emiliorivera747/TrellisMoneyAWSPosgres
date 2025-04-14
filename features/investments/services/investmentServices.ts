import { API_URL } from "@/utils/global-variables/globals";

const fetchInvestments = async () => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/plaid/investments/holdings?timestamp=${timestamp}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Error fetching investment holdings data");
  }
  const data = await res.json();
  return data;
};

export const investmentService = {
  fetchInvestments,
};
