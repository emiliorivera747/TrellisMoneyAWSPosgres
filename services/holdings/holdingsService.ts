import { API_URL } from "@/utils/global-variables/globals";
import {
  Account,
  Holding,
  Security,
  Household,
} from "@/app/generated/prisma/client";

// Types
import { ApiResponse } from "@/types/api-responses";

interface HoldingWithSecurity extends Holding {
  security: Security;
}

interface AccountsWithHoldings extends Account {
  holdings: HoldingWithSecurity[];
}

interface HouseholdWithAccounts extends Household {
  accounts: AccountsWithHoldings[];
}

/**
 * Fetches investment holdings from the API.
 *
 * Sends a GET request to the `investments/holdings` endpoint with the current
 * timestamp. Returns an `ApiResponse` containing an array of `Account` objects.
 *
 * @returns {Promise<ApiResponse<{household: AccountsWithHoldings[]}>>} A promise resolving to the API response.
 * @throws {Error} If the response is not successful.
 */
const getHoldings = async (): Promise<
  ApiResponse<{ household: HouseholdWithAccounts }>
> => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/investments/holdings?timestamp=${timestamp}`
  );
  if (!res.ok) throw new Error("Error fetching investment holdings data");
  const data: ApiResponse<{ household: HouseholdWithAccounts }> =
    await res.json();
  return data;
};

export const holdingService = {
  getHoldings,
};
