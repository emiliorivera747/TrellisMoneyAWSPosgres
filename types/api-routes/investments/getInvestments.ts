import { Item, Holding as HoldingDB } from "@/drizzle/schema/index";
import { Holding } from "plaid";

/**
 * Represents the properties for getting investments with items from Plaid.
 * @export
 * @interface GetInvestmentsWithItemsPlaid
 */
export interface GetInvestmentsWithItemsPlaid {
  /**
   * The items containing access tokens.
   * @type {Item[]}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  items: Item[];
  /**
   * The timestamp for the update.
   * @type {string}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  timestamp: string;
  /**
   * The user ID.
   * @type {string}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  userId: string;
  /**
   * The existing holdings in the database.
   * @type {Holding[]}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  holdings: HoldingDB[];
}

/**
 * Properties for updating holdings data.
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
  userId: string;
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
 * Properties for updating or creating a single holding.
 * @export
 * @interface UpdateOrCreateHoldingProps
 */
export interface UpdateOrCreateHoldingProps {
    /**
     * The holding data from Plaid.
     * @type {Holding}
     * @memberof UpdateOrCreateHoldingProps
     */
    holding: Holding;

    /**
     * Timestamp for the update operation.
     * @type {string}
     * @memberof UpdateOrCreateHoldingProps
     */
    timestamp: string;

    /**
     * The user ID.
     * @type {string}
     * @memberof UpdateOrCreateHoldingProps
     */
    userId: string;

    /**
     * Map of account IDs to holding IDs.
     * @type {Map<string, string>}
     * @memberof UpdateOrCreateHoldingProps
     */
    holdingsMap: Map<string, string>;
  }