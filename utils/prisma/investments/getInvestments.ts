import { getAllAccessTokens } from "@/utils/prisma/item/getAccessTokensFromItems";
import { updateHoldingsAndSecurities } from "@/utils/prisma/investments/updateHoldingsAndSecurities";
import { updateItem } from "@/utils/prisma/item/updateItems";
import { updateAccounts } from "@/utils/prisma/accounts/updateAccountsV2";

// Services
import { getAllHoldingsWithAccessTokens } from "@/services/plaid/holdings/holdings";

// Utils
import { updateHoldings } from "@/utils/prisma/holding/updateHoldings";

// Types
import { Account, Item } from "@/app/generated/prisma/client";
import { Holding } from "@/app/generated/prisma/client";

/**
 *
 * Fetch all of the investments associated with the access tokens
 *
 * @param items
 * @returns
 */
export const getInvestmentsPlaid = async (
  items: Item[],
  timestamp: string,
  accountsDB: Account[],
  user_id: string
) => {
  /**
   *  Get all of the access tokens from the items
   */
  const accessTokens = getAllAccessTokens(items);

  /**
   *  Go through each item and fetch the investments
   */
  const investmentsForEachItem = await getAllHoldingsWithAccessTokens(
    accessTokens
  );

  /**
   *  Store Holdings and Securities in the database
   */
  investmentsForEachItem.forEach(async (item) => {
    await updateItem(item.item);
    await updateAccounts([item.accounts], accountsDB);
    await updateHoldingsAndSecurities({
      holdings: item.holdings,
      securities: item.securities,
      timestamp,
      accountsDb: accountsDB,
      user_id,
    });
  });

  return investmentsForEachItem;
};

interface GetInvestmentsWithItemsPlaid {
  items: Item[];
  timestamp: string;
  user_id: string;
  holdings: Holding[];
}

export const getInvestmentsWithItemsPlaid = async ({
  items,
  timestamp,
  user_id,
  holdings: holdingsDB,
}: GetInvestmentsWithItemsPlaid) => {
  // Extract access tokens from the provided items
  const accessTokens = getAllAccessTokens(items);

  // Fetch investment data for each access token
  const investmentsForEachItem = await getAllHoldingsWithAccessTokens(
    accessTokens
  );

  // Update the database with fetched holdings and related data
  investmentsForEachItem.forEach(async (item) => {
    await updateItem(item.item);
    await updateHoldings({
      holdings: item.holdings,
      timestamp,
      user_id,
      holdingsDB,
    });
  });

  return investmentsForEachItem;
};
