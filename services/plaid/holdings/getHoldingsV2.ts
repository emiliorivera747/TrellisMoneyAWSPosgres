import { client } from "@/config/plaidClient";
import { getAllAccessTokens } from "@/utils/drizzle/item/getAccessTokensFromItems";
import { InvestmentsHoldingsGetResponse } from "plaid";
import { Item } from "@/drizzle/schema";

/**
 * Fetch all of the holdings associated with the access tokens
 * in the items array.
 *
 * @param items - Array of items containing access tokens
 * @returns Promise resolving to an array of Plaid holdings responses
 */
export const getHoldingsFromPlaidWithItems = async (
  items: Item[]
): Promise<InvestmentsHoldingsGetResponse[]> => {
  const accessTokens = getAllAccessTokens(items);

  const holdings = await Promise.all(
    accessTokens.map(async (token) => {
      const response = await client.investmentsHoldingsGet({
        access_token: token,
      });
      return response.data;
    })
  );

  return holdings;
};
