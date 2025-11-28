import { API_URL } from "@/utils/global-variables/globals";

const fetchHousehold = async () => {
  const res = await fetch(`${API_URL}/api/members`);
  if (!res.ok) throw new Error("Failed to fetch household members.");
  return res.json();
};

export const householdService = {
  fetchHousehold,
};
