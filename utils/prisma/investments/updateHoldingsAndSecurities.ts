import { Security, Holding } from "plaid";
import { upsertSecurities } from "@/utils/prisma/investments/securityService";
import { upsertHoldings } from "@/utils/prisma/investments/holdingService";
import { Account } from "@/app/generated/prisma/client";

interface UpdateHoldingsAndSecuritiesParams {
  holdings: Holding[];
  securities: Security[];
  timestamp: string;
  accountsDb: Account[];
  user_id: string;
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
  holdings,
  securities,
  timestamp,
  accountsDb,
  user_id,
}: UpdateHoldingsAndSecuritiesParams) => {
  const accountMap = new Map<string, { user_id: string; member_id: string }>();
  const securityMap = new Map<string, { member_id: string }>();
  const totalAccounts = accountsDb?.length;
  const numberOfHoldings = holdings?.length;

  for (let i = 0; i < totalAccounts; i++) {
    const account = accountsDb[i];
    accountMap.set(account.account_id, {
      user_id: account.user_id,
      member_id: account.member_id,
    });
  }

  for (let i = 0; i < numberOfHoldings; i++) {
    const holding = holdings[i];
    const accountInfo = accountMap.get(holding.account_id);
    if (accountInfo) {
      securityMap.set(holding.security_id, {
        member_id: accountInfo.member_id,
      });
    }
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
    securities,
    user_id,
    timestamp,
    securityMap,
    household_id: accountsDb[0].household_id,
  });

  await upsertHoldings({
    holdings,
    user_id,
    timestamp,
    accountMap,
    household_id: accountsDb[0].household_id,
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
