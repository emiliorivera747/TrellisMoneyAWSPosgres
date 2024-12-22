import { prisma } from "@/lib/prisma";
import { Holding } from "@/types/plaid";
import { createHoldingHistory,updateOrCreateHolding,getAllHoldingsWithIds } from "@/utils/api-helpers/plaid/holdings";

export async function updateHoldings(
  holdings: Holding[],
  user_id: string,
  timestamp: string
) {

  // Get all the user's holdings
  const userHoldings = await getAllHoldingsWithIds(user_id);

  // Check whether userHoldings and holdings have the same number of holdings with matching account_id and security_id
  const areHoldingsEqual = areHoldingTablesEqual(userHoldings, holdings);

  // // If the holdings are equal then delete all the holdings
  if (!areHoldingsEqual) {
    await prisma.holding.deleteMany({
      where: {
        user_id: user_id,
      },
    });
  }

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
      holding1[i].security_id === holding2[i].security_id
    ) {
      return true;
    }
  }
  return false;
}
