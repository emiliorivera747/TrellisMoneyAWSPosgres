import { API_URL } from "@/utils/global-variables/globals";

const fetchInvestments = async () => {
  const res = await fetch(`${API_URL}/plaid/investments/holdings`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
