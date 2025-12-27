import { client } from "@/config/plaidClient";
import { getAllAccessTokens } from "@/utils/prisma/item/getAccessTokensFromItems";
import { ItemPrisma } from "@/types/prisma";
import { updateHoldingsAndSecurities } from "@/utils/prisma/investments/updateHoldingsAndSecurities";
import { updateItem } from "@/utils/prisma/item/updateItems";
import { updateAccounts } from "@/utils/prisma/accounts/updateAccountsV2";
import { Account } from "@/app/generated/prisma/client";

/**
 *
 * Fetch all of the investments associated with the access tokens
 *
 * @param items
 * @returns
 */
export const getInvestmentsPlaid = async (
  items: ItemPrisma[],
  timestamp: string,
  accountsDB: Account[],
  user_id: string
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
   *  Store Holdings and Securities in the database
   */
  investmentsForEachItem.forEach(async (item) => {
    await updateItem(item.item);
    await updateAccounts([item.accounts], accountsDB);
    await updateHoldingsAndSecurities(
      item.holdings,
      item.securities,
      timestamp,
      accountsDB,
      user_id
    );
  });

  return investmentsForEachItem;
};
