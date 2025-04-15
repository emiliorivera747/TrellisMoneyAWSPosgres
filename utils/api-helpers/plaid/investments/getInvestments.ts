import { client } from "@/config/plaidClient";
import { getAllAccessTokens } from "@/utils/api-helpers/plaid/getAccessTokensFromItems";
import { ItemPrisma } from "@/types/prisma";
import { updateHoldingsAndSecurities } from "@/utils/api-helpers/plaid/investments/updateHoldingsAndSecurities";
import { updateItem } from "@/utils/api-helpers/plaid/items/updateItems";
import { updateAccounts } from "@/utils/api-helpers/plaid/accounts/updateAccountsV2";
import { getAccounts } from "@/utils/api-helpers/plaid/accounts/getAccountV2";

/**
 *
 * Fetch all of the investments associated with the access tokens
 *
 * @param items
 * @returns
 */
export const getInvestments = async (
  items: ItemPrisma[],
  timestamp: string
) => {
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
   *  Go through each item and fetch the accounts
   */
  const accounts = await getAccounts(items);

  /**
   *  Store Holdings and Securities in the database
   */
  investmentsForEachItem.forEach(async (item) => {
    await updateItem(item.item);
    await updateHoldingsAndSecurities(
      item.holdings,
      item.securities,
      timestamp
    );
  });
  /**
   *  Store the accounts in the database
   */
  await updateAccounts(accounts);

  return investmentsForEachItem;
};
