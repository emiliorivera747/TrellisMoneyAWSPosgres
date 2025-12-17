
import { Holding } from "@/types/plaid";
import {
  createHoldingHistory,
  updateOrCreateHolding,
} from "@/utils/prisma/holding/holdings";
import { getUser } from "@/services/supabase/getUser";



/**
 * Updates or creates holdings and their corresponding history records for a user.
 *
 * @param holdings - An array of `Holding` objects representing the user's investment holdings.
 * @param timestamp - A string representing the timestamp when the holdings are updated.
 *
 * This function retrieves the current user, iterates through the provided holdings,
 * and performs the following operations for each holding:
 * - Updates or creates the holding record in the database.
 * - Creates a history record for the holding with the provided timestamp.
 *
 * Note: The `getUser`, `updateOrCreateHolding`, and `createHoldingHistory` functions
 * are assumed to handle the database operations and are called asynchronously.
 *
 * @throws Will throw an error if any of the asynchronous operations fail.
 */
export async function updateHoldings(
  holdings: Holding[],
  timestamp: string
) {
  const user = await getUser();
  const user_id = user?.id || "";

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
