// Services
import {
  getAllHoldingsWithAccessTokens,
  fetchAllPlaidHoldings,
} from "@/services/plaid/holdings/holdings";

// Utils
import { updateHoldings } from "@/utils/prisma/holding/updateHoldings";
import { getAllAccessTokens } from "@/utils/prisma/item/getAccessTokensFromItems";
import { updateAccountsInTx } from "@/utils/drizzle/accounts/updateAccounts";
import { updateSecuritiesInTx } from "@/utils/drizzle/securities/updateSecurities";
import { logErrorAndThrow } from "@/utils/api-helpers/errors/logAndThrowError";
import { updateHoldingsInTx } from "@/utils/drizzle/holdings/updateHoldings";

// Types
import {
  Item,
  Account as AccountDB,
  Holding as HoldingDB,
} from "@/drizzle/schema/index";
import { GetInvestmentsWithItemsPlaid } from "@/types/api-routes/investments/getInvestments";

// Drizzle
import { db } from "@/drizzle/db";

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
  /**
   * Get all holdings from Plaid
   */
  const plaidResponse = await fetchAllPlaidHoldings(items);

  const plaidAccounts = plaidResponse.flatMap((res) => res.accounts);
  const plaidHoldings = plaidResponse.flatMap((res) => res.holdings);
  const plaidSecurities = plaidResponse.flatMap((res) => res.securities);

  if (plaidHoldings.length === 0)
    return logErrorAndThrow("No holdings found in any connected accounts");

  const res = await db.transaction(async (tx) => {
    
    const updateAccounts = updateAccountsInTx({
      tx,
      accountsDB,
      plaidAccounts,
    });

    const [updatedSecurities, updatedHoldings] = await Promise.all([
      updateSecuritiesInTx({ plaidSecurities, tx, timestamp }),
      updateHoldingsInTx({ plaidHoldings, tx, timestamp, holdingsDB }),
    ]);

    return {
      holdingsUpdated: updatedHoldings,
      securititiesUpdated: updatedSecurities,
      accounts: updateAccounts,
    };
  });

  return res;
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
