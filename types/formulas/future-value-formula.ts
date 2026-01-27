import { Decimal } from "decimal.js";

/**
 * Represents a numeric value that can be either a number or a Decimal.
 * @typedef {number | Decimal} Numeric
 */
type Numeric = number | Decimal;

/**
 * Represents the parameters for calculating future value.
 * @export
 * @interface FutureValueParams
 */
export interface FutureValueParams {
  /**
   * The present value of the assets. For instance, if you have a stock the
   * present value would be close_price * quantity
   * @type {Numeric}
   * @memberof FutureValueParams
   */
  present_value?: Numeric;

  /**
   * The quantity of stocks owned.
   * Can be a number or a Decimal type.
   * @type {Numeric}
   * @memberof FutureValueParams
   */
  quantity?: Numeric;

  /**
   * The closing price of the stock.
   * Can be a number or a Decimal type.
   * @type {Numeric}
   * @memberof FutureValueParams
   */
  close_price?: Numeric;

  /**
   * The estimated annual return rate.
   * Can be a number or a Decimal type.
   * @type {Numeric}
   * @memberof FutureValueParams
   */
  expected_annual_return_rate: Numeric;

  /**
   * The number of years over which the future value is calculated.
   * @type {number}
   * @memberof FutureValueParams
   */
  years: number;
}

/**
 * Represents the parameters for calculating inflation-adjusted future value.
 * @export
 * @interface InflationAdjustedFutureValueParams
 */
export interface InflationAdjustedFutureValueParams extends FutureValueParams {
  /**
   * Estimated annual inflation rate.
   * @type {Numeric}
   * @memberof InflationAdjustedFutureValueParams
   */
  annualInflationRate: Numeric;
}

/**
 * Represents the parameters for calculating future value with inflation option.
 * @export
 * @interface FutureValueInflationOption
 */
export interface FutureValueInflationOption extends FutureValueParams {
  /**
   * A flag indicating whether to include inflation in the future value calculation.
   * @type {boolean}
   * @memberof FutureValueInflationOption
   */
  includesInflation: boolean;

  /**
   * Estimated annual inflation rate.
   * @type {Numeric}
   * @memberof FutureValueInflationOption
   */
  annualInflationRate: Numeric;
}
