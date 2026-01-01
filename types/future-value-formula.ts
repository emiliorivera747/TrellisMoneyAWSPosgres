import { Decimal } from "decimal.js";
type Numeric = number | Decimal;

export interface FutureValueParams {
  /**
   * The present value of the assets. For instance, if you have a stock the
   * present value would be close_price * quantity
   */
  present_value?: Numeric;

  /**
   * The quantity of stocks owned.
   * Can be a number or a Decimal type.
   */
  quantity?: Numeric;

  /**
   * The closing price of the stock.
   * Can be a number or a Decimal type.
   */
  close_price?: Numeric;

  /**
   * The estimated annual return rate.
   * Can be a number or a Decimal type.
   */
  annual_return_rate: Numeric;

  /**
   * The number of years over which the future value is calculated.
   */
  years: number;

  /**
   * Does it include inflation
   */
  with_inflation?: boolean;
}

export interface InflationAdjustedFutureValueParams extends FutureValueParams {
  /**
   * Estimated annual inflation rate.
   */
  annual_inflation_rate: Numeric;
}
