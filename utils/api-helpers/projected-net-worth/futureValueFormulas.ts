import { Decimal } from "decimal.js";
import { Holding } from "@/types/services/plaid/plaid";
import {
  getQuantity,
  getClosePrice,
  getAnnualReturnRate,
  getInstitutionalValue,
} from "@/utils/api-helpers/holdings/holdingAccessors";

import {
  FutureValueParams,
  InflationAdjustedFutureValueParams,
  FutureValueInflationOption,
} from "@/types/formulas/future-value-formula";

/**
 * Calculates the future value of an investment adjusted for inflation.
 *
 * This function computes the future value of an investment by taking into account
 * the annual return rate, annual inflation rate, and the number of years the investment
 * is held. It adjusts the future value to account for the erosion of purchasing power
 * due to inflation.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.quantity - The quantity of the investment (e.g., number of shares).
 * @param {number} params.close_price - The price per unit of the investment at the start.
 * @param {number} params.expected_annual_return_rate - The annual return rate of the investment (as a decimal, e.g., 0.05 for 5%).
 * @param {number} params.annual_inflation_rate - The annual inflation rate (as a decimal, e.g., 0.02 for 2%).
 * @param {number} params.years - The number of years the investment is held.
 * @returns {number} The future value of the investment adjusted for inflation.
 */
export const calculateInflationAdjustedFutureValueForStock = ({
  quantity,
  close_price,
  expected_annual_return_rate,
  annual_inflation_rate,
  years,
}: InflationAdjustedFutureValueParams) => {
  const growthFactor = Math.pow(1 + Number(expected_annual_return_rate), years);
  const inflationFactor = Math.pow(1 + Number(annual_inflation_rate), years);
  const pv = Number(quantity) * Number(close_price);
  const fv = pv * growthFactor;
  return fv / inflationFactor;
};

/**
 * Calculates the inflation-adjusted future value of an investment.
 *
 * This function determines the future value of a present investment
 * after accounting for annual return rates and annual inflation rates
 * over a specified number of years.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.present_value - The current value of the investment.
 * @param {number} params.expected_annual_return_rate - The annual rate of return as a decimal (e.g., 0.05 for 5%).
 * @param {number} params.annual_inflation_rate - The annual inflation rate as a decimal (e.g., 0.02 for 2%).
 * @param {number} params.years - The number of years over which the investment grows.
 * @returns {number} The future value of the investment adjusted for inflation.
 */
export const calculateInflationAdjustedFutureValue = ({
  present_value,
  expected_annual_return_rate,
  annual_inflation_rate,
  years,
}: InflationAdjustedFutureValueParams) => {
  const growthFactor = Math.pow(1 + Number(expected_annual_return_rate), years);
  const inflationFactor = Math.pow(1 + Number(annual_inflation_rate), years);
  const fv = Number(present_value) * growthFactor;
  return fv / inflationFactor;
};

/**
 * Calculates the future value of a stock investment based on the provided parameters.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.quantity - The number of stock units owned.
 * @param {number} params.close_price - The closing price of the stock.
 * @param {number} params.expected_annual_return_rate - The expected annual return rate (as a decimal, e.g., 0.05 for 5%).
 * @param {number} params.years - The number of years the investment will grow.
 * @returns {number} The future value of the stock investment.
 */
export const calculateFutureValueForStock = ({
  quantity,
  close_price,
  expected_annual_return_rate,
  years,
}: FutureValueParams) => {
  const growthFactor = Math.pow(1 + Number(expected_annual_return_rate), years);
  const pv = Number(quantity) * Number(close_price);
  const fv = pv * growthFactor;
  return fv;
};

/**
 * Calculates the future value of an investment based on the provided parameters.
 *
 * This function computes the future value of an investment by applying the annual
 * return rate over a specified number of years.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.present_value - The current value of the investment.
 * @param {number} params.expected_annual_return_rate - The annual rate of return as a decimal (e.g., 0.05 for 5%).
 * @param {number} params.years - The number of years over which the investment grows.
 * @returns {number} The future value of the investment.
 */
export const calculateFutureValue = ({
  present_value,
  expected_annual_return_rate,
  years,
}: FutureValueParams) => {
  const growthFactor = Math.pow(1 + Number(expected_annual_return_rate), years);
  return Number(present_value) * growthFactor;
};

/**
 * Calculates the future value of an investment based on the provided parameters.
 * The calculation can optionally account for inflation.
 *
 * @param {Object} params - The parameters for the future value calculation.
 * @param {number} params.present_value - The current value of the investment.
 * @param {number} params.expected_annual_return_rate - The expected annual return rate (as a decimal, e.g., 0.05 for 5%).
 * @param {number} params.annual_inflation_rate - The expected annual inflation rate (as a decimal, e.g., 0.02 for 2%).
 * @param {number} params.years - The number of years over which the investment will grow.
 * @param {boolean} params.includes_inflation - Whether to adjust the calculation for inflation.
 *
 * @returns {number} The calculated future value of the investment.
 */
export const getFutureValue = ({
  present_value,
  expected_annual_return_rate,
  annual_inflation_rate,
  years,
  includes_inflation,
}: FutureValueInflationOption): number => {
  const pv = getPresentValue(present_value);
  const fv = includes_inflation
    ? calculateInflationAdjustedFutureValue({
        present_value: pv,
        expected_annual_return_rate,
        annual_inflation_rate,
        years,
      })
    : calculateFutureValue({
        present_value: pv,
        expected_annual_return_rate,
        years,
      });
  return fv;
};

/**
 * Calculates and returns a set of formula values for a given holding.
 *
 * @param holding - The holding object containing data required for calculations.
 * @returns An object containing the following calculated values:
 * - `quantity`: The quantity of the holding.
 * - `close_price`: The closing price of the holding.
 * - `expected_annual_return_rate`: The annual return rate of the holding.
 * - `institutional_value`: The institutional value of the holding.
 */
export const getFormulaValues = (holding: Holding) => {
  return {
    quantity: getQuantity(holding),
    close_price: getClosePrice(holding),
    expected_annual_return_rate: getAnnualReturnRate(holding),
    institutional_value: getInstitutionalValue(holding),
  };
};

/**
 * Converts a given value to a number if it is of type `Decimal` or returns it as is
 * if it is already a number. If the input is `undefined`, the function will return `undefined`.
 *
 * @param present_value - The value to be converted, which can be of type `Decimal`, `number`, or `undefined`.
 * @returns The numeric representation of the input value, or `undefined` if the input is `undefined`.
 */
const getPresentValue = (present_value: Decimal | number | undefined) => {
  const valueNumber =
    present_value instanceof Decimal ? present_value.toNumber() : present_value;
  return valueNumber;
};
