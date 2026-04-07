import { API_URL } from "@/utils/global-variables/globals";
import { ApiResponse } from "@/types/services/responses/api-responses";
import { AccountWithInstitution } from "@/features/accounts/types/accounts";

/**
 * Fetches the list of accounts from the API.
 *
 * @returns {Promise<ApiResponse<{accounts: AccountWithInstitution[]}>>} A promise that resolves to the API response containing account data.
 * @throws {Error} If the fetch operation fails or the response is not OK.
 */
const fetchAccounts = async (): Promise<
  ApiResponse<{ accounts: AccountWithInstitution[] }>
> => {
  const res = await fetch(`${API_URL}/accounts`);

  if (!res.ok)
    throw new Error(
      `Failed to fetch accounts: ${res.status} ${res.statusText}`
    );

  const data: ApiResponse<{ accounts: AccountWithInstitution[] }> =
    await res.json();

  if (!data || !data.data || !Array.isArray(data.data.accounts)) {
    throw new Error("Invalid data structure received from the API");
  }

  return data;
};

export const accountServices = {
  fetchAccounts,
};
