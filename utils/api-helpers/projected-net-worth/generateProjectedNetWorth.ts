import { Holding } from "@/types/plaid";
import { Decimal } from "decimal.js";

/**
 * Generates the projected net worth over a range of years based on the provided holdings.
 *
 * @param {Holding[]} holdings - An array of holding objects, each containing quantity, security, and annual return rate.
 * @param {Date} start_date - The start date for the projection.
 * @param {Date} end_date - The end date for the projection.
 * @returns {Promise<{ year: number, close: number }[]>} - A promise that resolves to an array of objects, each representing the projected net worth for a specific year.
 */
export const generateProjectedNetWorth = async (
  holdings: Holding[],
  start_date: Date,
  end_date: Date
) => {
  const projectedNetWorth = [];

  const startYear = start_date.getFullYear();
  const endYear = end_date.getFullYear();

  const n = endYear - startYear;

  // Early return for empty holdings or invalid dates
  if (!holdings.length || end_date <= start_date) {
    return [];
  }

  /**
   * Loop through each year in the range and calculate the projected net worth for that year.
   */
  for (let i = 0; i < n; i++) {
    let total = 0;

    /**
     * Loop through each holding and calculate the future value of the holding for the current year.
     */
    for (const holding of holdings) {
      const { quantity, close_price, annual_return_rate } = getFormulaValues(holding);
      let fv = future_value_fn(quantity, close_price, annual_return_rate, i + 1);
      total += fv;
    }
    
    projectedNetWorth.push({
      year: startYear + i,
      close: total,
    });
  }

  return projectedNetWorth;
};

/**
 * 
 * @param quantity 
 * @param close_price 
 * @param annual_return_rate 
 * @param growthFactor 
 * @returns 
 */
const future_value_fn = (
  quantity: number | Decimal,
  close_price: number | Decimal,
  annual_return_rate: number | Decimal,
  years: number
) => {
  const growthFactor = Math.pow(1 + Number(annual_return_rate), years);
  return (
    Number(quantity) *
    Number(close_price) *
    growthFactor
  );
};

const getQuantity = (holding: Holding) => {
  return holding?.quantity ? holding.quantity : 0;
};

const getClosePrice = (holding: Holding) => {
  return holding?.security?.close_price ? holding.security.close_price : 0;
};

const getAnnualReturnRate = (holding: Holding) => {
  return holding?.annual_return_rate ? holding.annual_return_rate : 0;
};

const getFormulaValues = (holding: Holding) => {
  return {
    quantity: getQuantity(holding),
    close_price: getClosePrice(holding),
    annual_return_rate: getAnnualReturnRate(holding),
  };
}
