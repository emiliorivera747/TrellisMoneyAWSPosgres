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


export interface UpdateOrCreateHoldingProps {
    holding: Holding;
    timestamp: string;
    userId: string;
    holdingsMap: Map<string, string>;
  }