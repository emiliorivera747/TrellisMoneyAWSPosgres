// Utils
import { upsertSecurities } from "@/utils/drizzle/investments/securityService";
import { upsertHoldings } from "@/utils/drizzle/investments/holdingService";

// Types
import { UpdateHoldingsAndSecuritiesParams } from "@/types/utils/drizzle/investments/getInvestments";
import { generateHoldingMap } from "@/utils/api-helpers/holdings/holdingMap";

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
}: UpdateHoldingsAndSecuritiesParams) => {
  /**
   * Generate holding map to get householdMemberId for each account
   * This is needed because Drizzle schema uses householdMemberId instead of user_id
   */
  const holdingMap = generateHoldingMap(holdingsDB);

  /**
   * Upsert securities and holdings in parallel
   * Note: In Drizzle schema, securities are standalone and don't need user_id or household_id
   */
  await Promise.all([
    upsertSecurities({
      plaidSecurities: securitiesPlaid,
      timestamp: timestamp,
    }),
    upsertHoldings({
      holdingsPlaid,
      timestamp,
      holdingMap,
    }),
  ]);
};
