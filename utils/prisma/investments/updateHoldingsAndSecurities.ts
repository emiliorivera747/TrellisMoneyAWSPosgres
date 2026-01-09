import { Security, Holding } from "plaid";
import { upsertSecurities } from "@/utils/prisma/investments/securityService";
import { upsertHoldings } from "@/utils/prisma/investments/holdingService";
import { Holding as HoldingDB } from "@/app/generated/prisma/browser";

interface UpdateHoldingsAndSecuritiesParams {
  holdingsPlaid: Holding[];
  holdingsDB: HoldingDB[];
  securitiesPlaid: Security[];
  user_id: string;
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
  user_id,
}: UpdateHoldingsAndSecuritiesParams) => {
  const holdingMap = new Map<
    string,
    {
      user_id: string;
      member_id: string;
      security_id: string;
      holding_id: string;
    }
  >();

  const securityMap = new Map<string, { member_id: string }>();

  for (const holding of holdingsDB) {
    holdingMap.set(holding.holding_id, {
      user_id: holding.user_id,
      member_id: holding.member_id,
      security_id: holding.security_id,
    });
  }

  for (const security of securitiesPlaid) {
    securityMap.set(security.security_id, {
      member_id: holdingMap.get(security.holding_id),
    });
  }

  // /**
  //  * Retrieve all existing Securities and Holdings in parallel
  //  */
  // const [existingSecurities, existingHoldings] = await Promise.all([
  //   getExistingSecurities(securities),
  //   getExistingHoldings(holdings),
  // ]);

  /**
   * Upsert securities and holdings, and get their history
   */
  await upsertSecurities({
    securitiesPlaid,
    user_id,
    timestamp,
    securityMap,
    household_id: accountsDb[0].household_id,
  });

  await upsertHoldings({
    holdingsPlaid,
    user_id,
    timestamp,
    holdingMap,
  });

  // // Add missing properties to holdingHistory
  // const holdingHistory = rawHoldingHistory.map((history) => ({
  //   ...history,
  //   member_id: accountMap.get(history.account_id)?.member_id || null,
  //   household_id: accountMap.get(history.account_id)?.household_id || null,
  // }));

  /**
   * Execute all database operations in a single transaction
   * This includes upserts and history creation
   */
  try {
    // const historyPromises = [];
    // if (securityHistory.length > 0) {
    //   historyPromises.push(
    //     prisma.securityHistory.createMany({
    //       data: securityHistory,
    //       skipDuplicates: true,
    //     })
    //   );
    // }
    // if (holdingHistory.length > 0) {
    //   historyPromises.push(
    //     prisma.holdingHistory.createMany({
    //       data: holdingHistory,
    //       skipDuplicates: true,
    //     })
    //   );
    // }
    // if (historyPromises.length > 0) {
    //   await Promise.all(historyPromises);
    // }
  } catch (error) {
    console.error(
      "An error occurred while updating holdings and securities:",
      error
    );
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
