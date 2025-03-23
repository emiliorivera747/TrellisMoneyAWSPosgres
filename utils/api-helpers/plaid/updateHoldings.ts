import { prisma } from "@/lib/prisma";
import { Holding } from "@/types/plaid";
import {
  createHoldingHistory,
  updateOrCreateHolding,
  getAllHoldingsWithIds,
} from "@/utils/api-helpers/plaid/holdings";

export async function updateHoldings(
  holdings: Holding[],
  user_id: string,
  timestamp: string
) {

  // Update or create each holding
  for (let holding of holdings) {
    await updateOrCreateHolding(holding, timestamp, user_id);
    await createHoldingHistory(holding, timestamp, user_id);
  }
}

/**
 * Check if the two holdings have the same account_id and security_id
 */
const areHoldingTablesEqual = (holding1: Holding[], holding2: Holding[]) => {
  if (holding1.length !== holding2.length) {
    return false;
  }

  /**
   * Check if the two holdings have the same account_id and security_id
   */
  for (let i = 0; i < holding1.length; i++) {
    if (
      holding1[i].account_id === holding2[i].account_id &&
      holding1[i].security_id === holding2[i].security_id &&
      holding1[i].user_id === holding2[i].user_id
    ) {
      return true;
    }
  }
  return false;
};
