import { client } from "@/config/plaidClient";
import { getAllAccessTokens } from "@/utils/api-helpers/plaid/getAccessTokensFromItems";

/**
 *
 * Fetch all of the investments associated with the access tokens
 *
 * @param items
 * @returns
 */
export const getInvestments = async (items: any) => {
  const accessTokens = await getAllAccessTokens(items);
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
