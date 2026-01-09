import { HouseholdWithAccountsExpanded } from "@/types/prisma/prisma";

/**
 * Represents the response structure for holdings.
 * @export
 * @interface HoldingsResponse
 */
export interface HoldingsResponse {
  /**
   * The household with expanded accounts.
   * @type {HouseholdWithAccountsExpanded}
   * @memberof HoldingsResponse
   */
  household: HouseholdWithAccountsExpanded;
}
