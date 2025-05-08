import { Account } from "@/types/plaid";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";

// Helpers
import {
  future_value_with_inflation_fn,
  future_value_fn,
  getFormulaValues,
} from "@/utils/api-helpers/futureValueFormulas";

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
): Promise<{ date: Date; close: number }[]> => {
  const projectedNetWorth: { date: Date; close: number }[] = [];

  // Early return for empty holdings or invalid dates
  if (!accounts.length || end_year < start_year) return [];
  const hm: { [key: number]: number } = {};
  const groups = Object.groupBy(accounts, (account) => account.type as AccountType);

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
 *
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
  const days = (end_year - start_year) * 365; // Only include the first month of the last year

  for (let i = 0; i <= days; i++) {
    const year = start_year + Math.floor(i / 365);
    const dayOfYear = i % 365;

    // Interpolate between the two values for this year and next year
    let previousValue = hm[year] || 0;
    let nextValue = hm[year + 1] || previousValue;

    // Linearly interpolate between the current year's value and next year's value
    const interpolationFactor = (i % 365) / 365;
    const interpolatedValue =
      previousValue + (nextValue - previousValue) * interpolationFactor;
    const date = new Date(year, 0, 1);
    date.setDate(date.getDate() + dayOfYear);

    // Only push dates within the first month of the last year
    if (year === end_year && date.getMonth() > 0) break;
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
 *
 * @param hm
 * @param start_year
 * @param end_year
 * @param holdings
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
  for (const account of accounts) {
    const holdings = account.holdings ?? [];
    /**
     * Go through each year and calculate the future value of the holdings
     */
    for (let i = 0; i < end_year - start_year + 1; i++) {
      let total = 0;
      for (const holding of holdings) {
        const { quantity, close_price, annual_return_rate } =
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
          let fv = future_value_fn(
            quantity,
            close_price,
            annual_return_rate,
            i
          );

          total += fv;
        }
      }
      hm[start_year + i] = hm[start_year + i]
        ? hm[start_year + i] + total
        : total;
    }
  }
};

/**
 *
 * populates the hashmap with the projected net worth
 * for each year
 *
 * @param hm
 * @param start_year
 * @param end_year
 * @param holdings
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
  for (const account of accounts) {
    const annual_return_rate = account.annual_return_rate;
    const current_amount = account.current;

    /**
     * Go through each year and calculate the future value of the holdings
     */
    for (let i = 0; i < end_year - start_year + 1; i++) {
      let total = 0;

      if (with_inflation) {
        let fv = future_value_with_inflation_fn(
          1,
          current_amount ?? 0,
          annual_return_rate ?? 0,
          annual_inflation_rate,
          i
        );
        if (account.type === "loan" || account.type === "credit") fv = -fv;
        total += fv;
      } else if (!with_inflation) {
        let fv = future_value_fn(
          1,
          current_amount ?? 0,
          annual_return_rate ?? 0,
          i
        );
        if (account.type === "loan" || account.type === "credit") fv = -fv;
        total += fv;
      }

      hm[start_year + i] = hm[start_year + i]
        ? hm[start_year + i] + total
        : total;
    }
  }
};
