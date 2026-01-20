import { getAllAccessTokens } from "@/utils/prisma/item/getAccessTokensFromItems";
import { updateHoldingsAndSecurities } from "@/utils/drizzle/investments/updateHoldingsAndSecurities";
import { updateAccounts } from "@/utils/drizzle/accounts/updateAccounts";

// Services
import { getAllHoldingsWithAccessTokens } from "@/services/plaid/holdings/holdings";

// Utils
import { updateHoldings } from "@/utils/prisma/holding/updateHoldings";

// Types
import {
  Item,
  Account as AccountDB,
  Holding as HoldingDB,
} from "@/drizzle/schema/index";
import { GetInvestmentsWithItemsPlaid } from "@/types/api-routes/investments/getInvestments";

/**
 * Fetch investments using access tokens.
 * @param {Item[]} items - Items with access tokens.
 * @param {string} timestamp - Update timestamp.
 * @param {AccountDB[]} accountsDB - Existing database accounts.
 * @param {HoldingDB[]} holdingsDB - Existing database holdings.
 * @param {string} user_id - User ID.
 * @returns {Promise<any>} Investments for each item.
 */
export const getInvestmentsPlaid = async (
  items: Item[],
  timestamp: string,
  accountsDB: AccountDB[],
  holdingsDB: HoldingDB[],
  user_id: string
) => {
  // Extract access tokens from the provided items
  const accessTokens = getAllAccessTokens(items);

  // Fetch investment data for each access token
  const investmentsForEachItem = await getAllHoldingsWithAccessTokens(
    accessTokens
  );

  // Update the database with fetched holdings and related data
  investmentsForEachItem.forEach(async (item) => {
    await updateAccounts([item.accounts], accountsDB);
    await updateHoldingsAndSecurities({
      holdingsPlaid: item.holdings,
      securitiesPlaid: item.securities,
      timestamp,
      holdingsDB,
      accountsDB,
      userId: user_id,
    });
  });

  return investmentsForEachItem;
};

/**
 * Fetches investments with items from Plaid.
 * @export
 * @param {GetInvestmentsWithItemsPlaid} props - The properties for getting investments.
 * @returns {Promise<any>} The investments for each item.
 */
export const getInvestmentsWithItemsPlaid = async ({
  items,
  timestamp,
  userId,
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
    await updateHoldings({
      holdings: item.holdings,
      timestamp,
      userId,
      holdingsDB,
    });
  });

  return investmentsForEachItem;
};
