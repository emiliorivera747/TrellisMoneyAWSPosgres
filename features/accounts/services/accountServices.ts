import { API_URL } from "@/utils/global-variables/globals";
import { ApiResponse } from "@/types/api-responses/accounts";
import { Account } from "@/app/generated/prisma/client";

/**
 * Fetches the list of accounts from the API.
 *
 * @returns {Promise<ApiResponse<{accounts: Account[]}>>} A promise that resolves to the API response containing account data.
 * @throws {Error} If the fetch operation fails or the response is not OK.
 */
const fetchAccounts = async (): Promise<ApiResponse<{ accounts: Account[] }>> => {
  const res = await fetch(`${API_URL}/accounts`);

  if (!res.ok) {
    const errorMessage = `Failed to fetch accounts: ${res.status} ${res.statusText}`;
    throw new Error(errorMessage);
  }

  const data: ApiResponse<{ accounts: Account[] }> = await res.json();
  return data;
};

export const accountServices = {
  fetchAccounts,
};
