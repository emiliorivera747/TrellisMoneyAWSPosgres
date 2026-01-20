import { Security, Holding } from "plaid";
import { upsertSecurities } from "@/utils/drizzle/investments/securityService";
import { upsertHoldings } from "@/utils/drizzle/investments/holdingService";
import { Holding as HoldingDB, Account as AccountDB } from "@/drizzle/schema";
import { generateAccountMap } from "@/utils/api-helpers/accounts/accountMaps";

interface UpdateHoldingsAndSecuritiesParams {
  holdingsPlaid: Holding[];
  holdingsDB: HoldingDB[];
  securitiesPlaid: Security[];
  accountsDB: AccountDB[];
  userId: string;
  timestamp: string;
}

/**
 *
 * Updates the holdings and securities in the database.
 * Optimized to run queries in parallel and combine all operations in one transaction
 *
 * @param holdings
 * @param securities
 * @param timestamp
 */
export const updateHoldingsAndSecurities = async ({
  holdingsPlaid,
  securitiesPlaid,
  timestamp,
  holdingsDB,
  accountsDB,
  userId,
}: UpdateHoldingsAndSecuritiesParams) => {
  /**
   * Generate account map to get householdMemberId for each account
   * This is needed because Drizzle schema uses householdMemberId instead of user_id
   */
  const accountMap = generateAccountMap(accountsDB);

  /**
   * Upsert securities and holdings in parallel
   * Note: In Drizzle schema, securities are standalone and don't need user_id or household_id
   */
  await Promise.all([
    upsertSecurities({
      securitiesPlaid,
      timestamp,
    }),
    upsertHoldings({
      holdingsPlaid,
      timestamp,
      accountMap,
    }),
  ]);
};
