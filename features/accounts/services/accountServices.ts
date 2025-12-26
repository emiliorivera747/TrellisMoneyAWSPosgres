import { API_URL } from "@/utils/global-variables/globals";
import { ApiResponse } from "@/types/api-responses/accounts";
import { Account } from "@/app/generated/prisma/client";

/**
 * Fetches the list of accounts from the API.
 *
 * @returns {Promise<ApiResponse<{accounts: Account[]}>>} A promise that resolves to the API response containing account data.
 * @throws {Error} If the fetch operation fails or the response is not OK.
 */
const fetchAccounts: () => Promise<
  ApiResponse<{ accounts: Account[] }>
> = async () => {
  const res = await fetch(`${API_URL}/accounts`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
};

export const accountServices = {
  fetchAccounts,
};
