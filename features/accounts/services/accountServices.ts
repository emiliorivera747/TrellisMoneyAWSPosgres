import { API_URL } from "@/utils/global-variables/globals";

const fetchAccounts = async () => {
  const res = await fetch(`${API_URL}/plaid/accounts`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch accounts");

  return res.json();
};

export const accountServices = {
  fetchAccounts,
};
