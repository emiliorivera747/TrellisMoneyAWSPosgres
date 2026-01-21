import { client } from "@/config/plaidClient";
import { Item } from "@/drizzle/schema";

/**
 * Fetches investment holdings for given access tokens.
 *
 * @param accessTokens - Array of access tokens.
 * @returns Promise resolving to an array of holdings data.
 * @throws Propagates errors from `investmentsHoldingsGet` or Promise.all.
 */
export const getAllHoldingsWithAccessTokens = async (
  accessTokens: string[]
) => {
  const investmentHoldings = await Promise.all(
    accessTokens.map(async (token) => {
      const response = await client.investmentsHoldingsGet({
        access_token: token,
      });
      return response.data;
    })
  );
  return investmentHoldings;
};

/**
 * Fetch holdings from Plaid for all items in parallel
 */
export async function fetchAllPlaidHoldings(
  items: Pick<Item, "accessToken">[]
) {
  const responses = await Promise.all(
    items.map(async (item) => {
      const response = await client.investmentsHoldingsGet({
        access_token: item.accessToken,
      });
      return response.data;
    })
  );

  return responses;
}
