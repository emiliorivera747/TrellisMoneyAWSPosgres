import { Holding } from "@/types/plaid";
import { Decimal } from "decimal.js";

/**
 * Generates the projected net worth over a range of years based on the provided holdings.
 *
 * @param {Holding[]} holdings - An array of holding objects, each containing quantity, security, and annual return rate.
 * @param {Date} start_year - The start date for the projection.
 * @param {Date} end_year - The end date for the projection.
 * @returns {Promise<{ year: Date, close: number }[]>} - A promise that resolves to an array of objects, each representing the projected net worth for a specific year.
 */
export const generateProjectedNetWorthV2 = async (
  holdings: Holding[],
  start_year: number,
  end_year: number,
  with_inflation: boolean
): Promise<{ date: Date; close: number }[]> => {
  const projectedNetWorth: { date: Date; close: number }[] = [];

  // Early return for empty holdings or invalid dates
  if (!holdings.length || end_year < start_year) return [];

  // Create a hashmap to store the projected net worth for each year
  let hm: { [key: number]: number } = populateHashMapWithFv(
    {},
    start_year,
    end_year,
    holdings,
    with_inflation
  );

  pushProjectedNetWorthToEachMonth(projectedNetWorth, start_year, end_year, hm);

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
  year: number
) => {
  const growthFactor = Math.pow(1 + Number(annual_return_rate), year);
  const pv = Number(quantity) * Number(close_price);

  console.log("YEAR: ", year);
  console.log("growth factor: ", growthFactor);
  console.log("quantity", quantity, "* close_price", close_price, "=", pv);
  console.log("pv * growthFactor: ", pv * growthFactor);


  return pv * growthFactor;
};

/**
 *
 * @param quantity
 * @param close_price
 * @param annual_return_rate
 * @param growthFactor
 * @returns
 */
const future_value_with_inflation_fn = (
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
 * Quantity getter function
 * 
 * @param holding 
 * @returns 
 */
const getQuantity = (holding: Holding) => {
  return holding?.quantity ? holding.quantity : 0;
};

/**
 * Close price getter function
 * 
 * @param holding 
 * @returns 
 */
const getClosePrice = (holding: Holding) => {
  return holding?.security?.close_price ? holding.security.close_price : 0;
};

/**
 * Annual return rate getter function
 * 
 * @param holding 
 * @returns 
 */
const getAnnualReturnRate = (holding: Holding) => {
  return holding?.annual_return_rate ? holding.annual_return_rate : 0;
};

/**
 * annual inflation rate getter function
 * 
 * @param holding 
 * @returns 
 */
const getAnnualInflationRate = (holding: Holding) => {
  return holding?.annual_inflation_rate ? holding.annual_inflation_rate : 0;
};

/**
 * 
 * Returns the formula values for the future value calculation
 * 
 * @param holding 
 * @returns 
 */
const getFormulaValues = (holding: Holding) => {
  return {
    quantity: getQuantity(holding),
    close_price: getClosePrice(holding),
    annual_return_rate: getAnnualReturnRate(holding),
    annual_inflation_rate: getAnnualInflationRate(holding),
  };
};

/**
 *
 * populates the projected net worth for each year
 *
 *
 * @param projectedNetWorth
 * @param start_year
 * @param end_year
 * @param hm
 */
const pushProjectedNetWorthToEachMonth = (
  projectedNetWorth: { date: Date; close: number }[],
  start_year: number,
  end_year: number,
  hm: { [key: number]: number }
) => {
  const months = (end_year - start_year) * 12;

  for (let i = 0; i <= months; i++) {
    const year = start_year + Math.floor(i / 12);
    const month = i % 12;
    projectedNetWorth.push({
      date: new Date(year, month, 1),
      close: year in hm ? hm[year] : 0,
    });
  }
};

/**
 *
 * populates the hashmap with the projected net worth for each year
 *
 *
 * @param hm
 * @param start_year
 * @param end_year
 * @param holdings
 * @returns
 */
const populateHashMapWithFv = (
  hm: { [key: number]: number },
  start_year: number,
  end_year: number,
  holdings: Holding[],
  with_inflation: boolean
) => {
  for (let i = 0; i < end_year - start_year + 1; i++) {
    
    let total = 0;

    for (const holding of holdings) {

      const { quantity, close_price, annual_return_rate, annual_inflation_rate} =
        getFormulaValues(holding);

      if (with_inflation) {
        let fv = future_value_with_inflation_fn(
          quantity,
          close_price,
          annual_return_rate,
          annual_inflation_rate,
          i
        );
        total += fv;
      } else if (!with_inflation) {
        let fv = future_value_fn(quantity, close_price, annual_return_rate, i);
        total += fv;
      }
    }
    hm[start_year + i] = total;
  }

  return hm;
};
