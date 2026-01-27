import { Account } from "@/types/services/plaid/plaid";

/**
 * Represents the parameters for populating a map with future values.
 * @export
 * @interface PopulateMapWithFvParams
 */
export interface PopulateMapWithFvParams {
  /**
   * The map to populate with projections.
   * @type {Map<number, number>}
   * @memberof PopulateMapWithFvParams
   */
  projectionsMap: Map<number, number>;
  /**
   * The start year for projections.
   * @type {number}
   * @memberof PopulateMapWithFvParams
   */
  start_year: number;
  /**
   * The end year for projections.
   * @type {number}
   * @memberof PopulateMapWithFvParams
   */
  end_year: number;
  /**
   * The accounts to use for projections.
   * @type {Account[]}
   * @memberof PopulateMapWithFvParams
   */
  accounts: Account[];
  /**
   * Whether to include inflation in calculations.
   * @type {boolean}
   * @memberof PopulateMapWithFvParams
   */
  includesInflation: boolean;
  /**
   * The annual inflation rate.
   * @type {number}
   * @memberof PopulateMapWithFvParams
   */
  annualInflationRate: number;
}
