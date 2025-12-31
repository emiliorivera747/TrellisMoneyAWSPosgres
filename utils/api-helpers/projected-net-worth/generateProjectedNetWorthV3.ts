import { Account } from "@/types/plaid";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { NetWorthData } from "@/features/projected-financial-assets/types/projectedAssets";

// Helpers
import {
  future_value_with_inflation_fn,
  future_value_fn,
  getFormulaValues,
} from "@/utils/api-helpers/projected-net-worth/futureValueFormulas";

/**
 * Generates the projected net worth over a range of years based on the provided holdings.
 *
 * @param {Holding[]} holdings - An array of holding objects, each containing quantity, security, and annual return rate.
 * @param {Date} start_year - The start date for the projection.
 * @param {Date} end_year - The end date for the projection.
 * @returns {Promise<{ year: Date, close: number }[]>} - A promise that resolves to an array of objects, each representing the projected net worth for a specific year.
 */
export const generateProjectedNetWorthV3 = async (
  accounts: Account[],
  start_year: number,
  end_year: number,
  with_inflation: boolean,
  annual_inflation_rate: number
): Promise<NetWorthData[]> => {
  const projectedNetWorth: NetWorthData[] = [];

  // Early return for empty holdings or invalid dates
  if (!accounts.length || end_year < start_year) return [];
  const hm: { [key: number]: number } = {};
  const groups = Object.groupBy(
    accounts,
    (account) => account.type as AccountType
  );

  for (let key in groups) {
    const accounts = groups[key as AccountType];
    if (key === "investment") {
      populateHashMapWithFvHoldings(
        hm,
        start_year,
        end_year,
        accounts ?? [],
        with_inflation,
        annual_inflation_rate
      );
    } else if (key === "depository") {
      populateHashMapWithFvAccounts(
        hm,
        start_year,
        end_year,
        accounts ?? [],
        with_inflation,
        annual_inflation_rate
      );
    } else if (key === "loan") {
      populateHashMapWithFvAccounts(
        hm,
        start_year,
        end_year,
        accounts ?? [],
        with_inflation,
        annual_inflation_rate
      );
    } else if (key === "credit") {
      populateHashMapWithFvAccounts(
        hm,
        start_year,
        end_year,
        accounts ?? [],
        with_inflation,
        annual_inflation_rate
      );
    }
  }
  pushProjectedNetWorthToEachDay(projectedNetWorth, start_year, end_year, hm);
  return projectedNetWorth;
};

/**
 *
 * populates the projected net worth for each day
 * Optimized to reduce redundant calculations and improve efficiency
 *
 * @param projectedNetWorth
 * @param start_year
 * @param end_year
 * @param hm
 */
const pushProjectedNetWorthToEachDay = (
  projectedNetWorth: { date: Date; close: number }[],
  start_year: number,
  end_year: number,
  hm: { [key: number]: number }
) => {
  const days = (end_year - start_year) * 365;

  for (let i = 0; i <= days; i++) {
    const year = start_year + Math.floor(i / 365);
    const dayOfYear = i % 365;

    // Early exit if we're past the first month of the last year
    if (year === end_year && dayOfYear >= 30) break;

    // Get values for interpolation
    const previousValue = hm[year] || 0;
    const nextValue = hm[year + 1] || previousValue;

    // Linearly interpolate between the current year's value and next year's value
    const interpolationFactor = dayOfYear / 365;
    const interpolatedValue =
      previousValue + (nextValue - previousValue) * interpolationFactor;

    const date = new Date(year, 0, 1 + dayOfYear);

    projectedNetWorth.push({
      date: date,
      close: Math.round(interpolatedValue * 100) / 100,
    });
  }
};

/**
 *
 * populates the hashmap with the projected net worth
 * for each year
 * Optimized to pre-calculate holdings data outside the year loop
 *
 * @param hm
 * @param start_year
 * @param end_year
 * @param accounts
 * @returns
 */
const populateHashMapWithFvHoldings = (
  hm: { [key: number]: number },
  start_year: number,
  end_year: number,
  accounts: Account[],
  with_inflation: boolean,
  annual_inflation_rate: number
) => {
  // Pre-calculate holding data for reuse across years
  const holdingsData = accounts.flatMap((account) =>
    (account.holdings ?? []).map((holding) => getFormulaValues(holding))
  );

  const yearRange = end_year - start_year + 1;

  // Calculate future values for each year
  for (let i = 0; i < yearRange; i++) {
    let total = 0;

    for (const { quantity, close_price, annual_return_rate } of holdingsData) {
      if (with_inflation) {
        total += future_value_with_inflation_fn(
          quantity,
          close_price,
          annual_return_rate,
          annual_inflation_rate,
          i
        );
      } else {
        total += future_value_fn(quantity, close_price, annual_return_rate, i);
      }
    }

    const year = start_year + i;
    hm[year] = (hm[year] || 0) + total;
  }
};

/**
 *
 * populates the hashmap with the projected net worth
 * for each year
 * Optimized to pre-calculate account data and remove redundant conditions
 *
 * @param hm
 * @param start_year
 * @param end_year
 * @param accounts
 * @returns
 */
const populateHashMapWithFvAccounts = (
  hm: { [key: number]: number },
  start_year: number,
  end_year: number,
  accounts: Account[],
  with_inflation: boolean,
  annual_inflation_rate: number
) => {
  // Pre-calculate account data for reuse
  const accountsData = accounts.map((account) => ({
    current_amount: account.current ?? 0,
    annual_return_rate: account.annual_return_rate ?? 0,
    isNegative: account.type === "loan" || account.type === "credit",
  }));

  const yearRange = end_year - start_year + 1;

  // Calculate future values for each year
  for (let i = 0; i < yearRange; i++) {
    let total = 0;

    for (const {
      current_amount,
      annual_return_rate,
      isNegative,
    } of accountsData) {
      let fv: number;

      if (with_inflation) {
        fv = future_value_with_inflation_fn(
          1,
          current_amount,
          annual_return_rate,
          annual_inflation_rate,
          i
        );
      } else {
        fv = future_value_fn(1, current_amount, annual_return_rate, i);
      }

      total += isNegative ? -fv : fv;
    }

    const year = start_year + i;
    hm[year] = (hm[year] || 0) + total;
  }
};
