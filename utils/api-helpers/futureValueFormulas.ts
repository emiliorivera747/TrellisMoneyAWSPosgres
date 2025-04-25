import { Decimal } from "decimal.js";
import { Holding } from "@/types/plaid";
import {
  getQuantity,
  getClosePrice,
  getAnnualReturnRate,
  getInstitutionalValue,
} from "@/utils/api-helpers/holdingAccessors";

/**
 *
 * @param quantity
 * @param close_price
 * @param annual_return_rate
 * @param growthFactor
 * @returns
 */
export const future_value_with_inflation_fn = (
  quantity: number | Decimal,
  close_price: number | Decimal,
  annual_return_rate: number | Decimal,
  annual_inflation_rate: number | Decimal,
  years: number
) => {
  const growthFactor = Math.pow(1 + Number(annual_return_rate), years);
  const inflationFactor = Math.pow(1 + Number(annual_inflation_rate), years);
  const pv = Number(quantity) * Number(close_price);
  const fv = pv * growthFactor;
  return fv / inflationFactor;
};

/**
 *
 * @param quantity
 * @param close_price
 * @param annual_return_rate
 * @param growthFactor
 * @returns
 */
export const future_value_with_inflation_fn_v2 = (
  pv: number | Decimal,
  annual_return_rate: number | Decimal,
  annual_inflation_rate: number | Decimal,
  years: number
) => {
  const growthFactor = Math.pow(1 + Number(annual_return_rate), years);
  const inflationFactor = Math.pow(1 + Number(annual_inflation_rate), years);
  const fv = Number(pv) * growthFactor;
  return fv / inflationFactor;
};

/**
 *
 * Returns the formula values for the future value calculation
 *
 * @param holding
 * @returns
 */
export const getFormulaValues = (holding: Holding) => {
  return {
    quantity: getQuantity(holding),
    close_price: getClosePrice(holding),
    annual_return_rate: getAnnualReturnRate(holding),
    institutional_value: getInstitutionalValue(holding),
  };
};

/**
 *
 * @param quantity
 * @param close_price
 * @param annual_return_rate
 * @param growthFactor
 * @returns
 */
export const future_value_fn = (
  quantity: number | Decimal,
  close_price: number | Decimal,
  annual_return_rate: number | Decimal,
  year: number
) => {
  const growthFactor = Math.pow(1 + Number(annual_return_rate), year);
  const pv = Number(quantity) * Number(close_price);
  return pv * growthFactor;
};

/**
 *
 */
export const future_value_fn_v2 = (
  pv: number | Decimal,
  annual_return_rate: number | Decimal,
  year: number
) => {
  const growthFactor = Math.pow(1 + Number(annual_return_rate), year);

  return Number(pv) * growthFactor;
};
