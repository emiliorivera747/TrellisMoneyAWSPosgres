import { Security } from "plaid";

/**
 * Parameters for upserting securities within a database transaction.
 * @export
 * @interface UpsertSecuritiesParams
 */
export interface UpsertSecuritiesParams {
  /**
   * Database transaction object.
   * @type {any}
   * @memberof UpsertSecuritiesParams
   */
  tx: any;

  /**
   * Array of securities from Plaid to be upserted.
   * @type {Security[]}
   * @memberof UpsertSecuritiesParams
   */
  plaidSecurities: Security[];

  /**
   * Optional timestamp for the update operation.
   * @type {string}
   * @memberof UpsertSecuritiesParams
   */
  timestamp?: string;
}
