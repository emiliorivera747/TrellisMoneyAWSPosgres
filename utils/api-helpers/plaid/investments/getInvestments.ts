import { client } from "@/config/plaidClient";
import { getAllAccessTokens } from "@/utils/api-helpers/plaid/getAccessTokensFromItems";
import { updateHoldings } from "@/utils/api-helpers/plaid/updateHoldings";
import { updateSecurities } from "@/utils/api-helpers/plaid/updateSecurities";
import { Item } from "@/types/plaid";

/**
 *
 * Fetch all of the investments associated with the access tokens
 *
 * @param items
 * @returns
 */
export const getInvestments = async (items: Item[], timestamp: string) => {
  /**
   *  Get all of the access tokens from the items
   */
  const accessTokens = await getAllAccessTokens(items);

  /**
   *  Go through each item and fetch the investments
   */
  const investmentsForEachItem = await Promise.all(
    accessTokens.map(async (token) => {
      const response = await client.investmentsHoldingsGet({
        access_token: token,
      });
      return response.data;
    })
  );

  /**
   *  Store Holdings and Securities in the database
   */
  investmentsForEachItem.forEach(async (item) => {
    
    // await updateHoldings(item.holdings, timestamp);
  });

  return investmentsForEachItem;
};
