import { API_URL } from "@/utils/global-variables/globals";
import { Account } from "@/app/generated/prisma/client";

// Types
import { ApiResponse } from "@/types/api-responses";

/**
 * Fetches investment holdings from the API.
 *
 * Sends a GET request to the `investments/holdings` endpoint with the current
 * timestamp. Returns an `ApiResponse` containing an array of `Account` objects.
 *
 * @returns {Promise<ApiResponse<Account[]>>} A promise resolving to the API response.
 * @throws {Error} If the response is not successful.
 */
const getHoldings = async (): Promise<ApiResponse<Account[]>> => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/investments/holdings?timestamp=${timestamp}`
  );
  if (!res.ok) throw new Error("Error fetching investment holdings data");
  const data: ApiResponse<Account[]> = await res.json();
  return data;
};

export const holdingService = {
  getHoldings,
};
