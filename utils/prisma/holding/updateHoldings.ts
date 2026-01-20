import { updateOrCreateHolding } from "@/utils/prisma/holding/holdings";

// Types
import { UpdateHoldingsProps } from "@/types/api-routes/investments/getInvestments";

/**
 * Updates or creates user holdings and history.
 * @param {UpdateHoldingsProps} props - Update properties.
 * @returns {Promise<void>}
 * @throws {Error} On operation failure.
 */
export async function updateHoldings({
  holdings,
  userId,
  timestamp,
  holdingsDB,
}: UpdateHoldingsProps) {
  const holdingsMap = new Map<string, string>();

  for (let holding of holdingsDB) {
    holdingsMap.set(
      `${holding.accountId}-${holding.securityId}`,
      holding.householdMemberId
    );
  }

  for (let holding of holdings) {
    await updateOrCreateHolding({ holding, userId, timestamp, holdingsMap });
  }
}
