// Services
import { fetchAllPlaidHoldings } from "@/services/plaid/holdings/holdings";

// Utils
import { updateAccountsInTx } from "@/utils/drizzle/accounts/updateAccounts";
import { updateSecuritiesInTx } from "@/utils/drizzle/securities/updateSecurities";
import { logErrorAndThrow } from "@/utils/api-helpers/errors/logAndThrowError";
import { updateHoldingsInTx } from "@/utils/drizzle/holdings/updateHoldings";

// Types
import {
  Item as ItemDB,
  Account as AccountDB,
  Holding as HoldingDB,
} from "@/drizzle/schema/index";

// Drizzle
import { db } from "@/drizzle/db";

type GetInvestmentsPlaid = {
  items: Pick<ItemDB, "accessToken">[];
  accountsDB: AccountDB[];
  holdingsDB: HoldingDB[];
  timestamp: string;
};

/**
 * Fetch investments using access tokens.
 * @param {Item[]} items - Items with access tokens.
 * @param {string} timestamp - Update timestamp.
 * @param {AccountDB[]} accountsDB - Existing database accounts.
 * @param {HoldingDB[]} holdingsDB - Existing database holdings.
 * @param {string} user_id - User ID.
 * @returns {Promise<any>} Investments for each item.
 */
export const refreshHouseholdHoldings = async ({
  items,
  timestamp,
  accountsDB,
  holdingsDB,
}: GetInvestmentsPlaid) => {
  
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
    // Update accounts first (holdings depend on accounts)
    const updatedAccounts = await updateAccountsInTx({
      tx,
      accountsDB,
      plaidAccounts,
    });

    // Update securities and holdings in parallel (they're independent)
    const [updatedSecurities, updatedHoldings] = await Promise.all([
      updateSecuritiesInTx({ plaidSecurities, tx, timestamp }),
      updateHoldingsInTx({ plaidHoldings, tx, timestamp, holdingsDB }),
    ]);

    return {
      holdingsUpdated: updatedHoldings,
      securititiesUpdated: updatedSecurities,
      accounts: updatedAccounts,
      stats: {
        holdingsUpdated: updatedHoldings.length,
        securitiesUpdated: updatedSecurities.length,
        accountsUpdated: updatedAccounts.length,
      },
    };
  });

  return res;
};