import { updateOrCreateHolding } from "@/utils/prisma/holding/holdings";

// Types
// import { Holding as HoldingDB } from "@/app/generated/prisma/client";
import { Holding } from "plaid";

/**
 * Represents the properties for updating holdings.
 * @export
 * @interface UpdateHoldingsProps
 */
export interface UpdateHoldingsProps {
  /**
   * The holdings from Plaid.
   * @type {Holding[]}
   * @memberof UpdateHoldingsProps
   */
  holdings: Holding[];
  /**
   * The user ID.
   * @type {string}
   * @memberof UpdateHoldingsProps
   */
  user_id: string;
  /**
   * The timestamp of the update.
   * @type {string}
   * @memberof UpdateHoldingsProps
   */
  timestamp: string;
  /**
   * The existing holdings in the database.
   * @type {HoldingDB[]}
   * @memberof UpdateHoldingsProps
   */
  holdingsDB: HoldingDB[];
}

/**
 * Updates or creates holdings and their history for a user.
 * @export
 * @param {UpdateHoldingsProps} props - The properties for updating holdings.
 * @param {Holding[]} props.holdings - User's investment holdings.
 * @param {string} props.user_id - The user ID.
 * @param {string} props.timestamp - Timestamp of the update.
 * @param {HoldingDB[]} props.holdingsDB - The existing holdings in the database.
 * @returns {Promise<void>}
 * @throws {Error} If any operation fails.
 */
export async function updateHoldings({
  holdings,
  user_id,
  timestamp,
  holdingsDB,
}: UpdateHoldingsProps) {
  const holdingsMap = new Map<string, string>();

  for (let holding of holdingsDB) {
    holdingsMap.set(
      `${holding.account_id}-${holding.security_id}`,
      holding.member_id
    );
  }

  for (let holding of holdings) {
    await updateOrCreateHolding({ holding, user_id, timestamp, holdingsMap });
  }
}

