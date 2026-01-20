import { Holding } from "@/drizzle/schema";

/**
 * Generates a map of holdings keyed by a combination of accountId and securityId.
 *
 * @param holdings - An array of Holding objects to be mapped.
 * @returns A Map where the key is a string in the format `${accountId}-${securityId}`,
 *          and the value is an object containing holdingId and householdMemberId.
 */
export const generateHoldingMap = (holdings: Holding[]) => {
  const hm = new Map();
  for (let holding of holdings) {
    hm.set(`${holding.accountId}-${holding.securityId}`, {
      holdingId: holding.holdingId,
      householdMemberId: holding.householdMemberId,
    });
  }
  return hm;
};
