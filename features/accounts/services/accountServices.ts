import { API_URL } from "@/utils/global-variables/globals";

const fetchAccounts = async () => {
  const res = await fetch(`${API_URL}/accounts`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
};

export const accountServices = {
  fetchAccounts,
};
