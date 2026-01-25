import {
  Holding as HoldingDB,
  Account as AccountDB,
} from "@/drizzle/schema/index";
import { Holding as plaidHolding, Security as plaidSecurity } from "plaid";

/**
 * Parameters for updating holdings and securities data.
 * @export
 * @interface UpdateHoldingsAndSecuritiesParams
 */
export interface UpdateHoldingsAndSecuritiesParams {
  /**
   * Array of holdings from Plaid API.
   * @type {plaidHolding[]}
   * @memberof UpdateHoldingsAndSecuritiesParams
   */
  holdingsPlaid: plaidHolding[];

  /**
   * Array of holdings from the database.
   * @type {HoldingDB[]}
   * @memberof UpdateHoldingsAndSecuritiesParams
   */
  holdingsDB: HoldingDB[];

  /**
   * Array of securities from Plaid API.
   * @type {plaidSecurity[]}
   * @memberof UpdateHoldingsAndSecuritiesParams
   */
  securitiesPlaid: plaidSecurity[];

  /**
   * Array of accounts from the database.
   * @type {AccountDB[]}
   * @memberof UpdateHoldingsAndSecuritiesParams
   */
  accountsDB: AccountDB[];

  /**
   * The user ID for the holdings update.
   * @type {string}
   * @memberof UpdateHoldingsAndSecuritiesParams
   */
  userId: string;

  /**
   * Timestamp for the update operation.
   * @type {string}
   * @memberof UpdateHoldingsAndSecuritiesParams
   */
  timestamp: string;
}

/**
 * Parameters for upserting holdings data.
 * @export
 * @interface UpsertHoldingsParams
 */
export interface UpsertHoldingsParams {
  /**
   * Array of holdings from Plaid API.
   * @type {plaidHolding[]}
   * @memberof UpsertHoldingsParams
   */
  holdingsPlaid: plaidHolding[];

  /**
   * Timestamp for the upsert operation.
   * @type {string}
   * @memberof UpsertHoldingsParams
   */
  timestamp: string;

  /**
   * Map of account IDs to holding IDs.
   * @type {Map<string, { holdingId: string }>}
   * @memberof UpsertHoldingsParams
   */
  holdingMap: Map<string, { holdingId: string }>;
}

/**
 * Parameters for updating holdings within a database transaction.
 * @export
 * @typedef {Object} UpdateHoldingsInTxParams
 */
export type UpdateHoldingsInTxParams =  {
  /**
   * Array of holdings from Plaid API.
   * @type {plaidHolding[]}
   * @memberof UpdateHoldingsInTxParams
   */
  plaidHoldings: plaidHolding[];

  /**
   * Array of holdings from the database.
   * @type {HoldingDB[]}
   * @memberof UpdateHoldingsInTxParams
   */
  holdingsDB: HoldingDB[];

  /**
   * Timestamp for the update operation.
   * @type {string}
   * @memberof UpdateHoldingsInTxParams
   */
  timestamp: string;

  /**
   * Database transaction object.
   * @type {any}
   * @memberof UpdateHoldingsInTxParams
   */
  tx: any;
}
