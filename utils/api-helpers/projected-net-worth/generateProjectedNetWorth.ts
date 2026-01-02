import { Account } from "@/types/plaid";
import { AccountType } from "plaid";
import { NetWorthData } from "@/features/projected-financial-assets/types/projectedAssets";

// Helpers
import {
  getFutureValue,
  getFormulaValues,
} from "@/utils/api-helpers/projected-net-worth/futureValueFormulas";
import { PopulateMapWithFvParams } from "@/types/projected-net-worth";

/**
 * Generates the projected net worth over a range of years based on the provided holdings.
 *
 * @param {Holding[]} holdings - An array of holding objects, each containing quantity, security, and annual return rate.
 * @param {Date} start_year - The start date for the projection.
 * @param {Date} end_year - The end date for the projection.
 * @returns {Promise<{ year: Date, close: number }[]>} - A promise that resolves to an array of objects, each representing the projected net worth for a specific year.
 */
export const generateProjectedNetWorth = async (
  accounts: Account[],
  start_year: number,
  end_year: number,
  includes_inflation: boolean,
  annual_inflation_rate: number
): Promise<NetWorthData[]> => {

  if (!accounts.length || end_year < start_year) return [];
  const projectionsMap = new Map<number, number>();
  const groups = createGroups(accounts);

  for (let key in groups) {
    const accounts = groups[key as AccountType];

    if (key === "investment") {
      populateMapWithFvHoldings({
        projectionsMap,
        start_year,
        end_year,
        accounts: accounts ?? [],
        includes_inflation,
        annual_inflation_rate,
      });
    } else if (
      key === "depository" ||
      key === "loan" ||
      key === "credit" ||
      key === "other"
    ) {
      populateMapWithFvAccounts({
        projectionsMap,
        start_year,
        end_year,
        accounts: accounts ?? [],
        includes_inflation,
        annual_inflation_rate,
      });
    }
  }

  const projectedNetWorth = generateDailyProjectedNetWorth(
    start_year,
    end_year,
    projectionsMap
  );

  return projectedNetWorth;
};

/**
 * Groups accounts by their type.
 *
 * @param accounts - Array of `Account` objects.
 * @returns Object with `AccountType` keys and arrays of `Account` objects.
 *
 * @example
 * const accounts = [
 *   { id: 1, type: 'savings', balance: 1000 },
 *   { id: 2, type: 'checking', balance: 500 },
 * ];
 * const grouped = createGroups(accounts);
 * // { savings: [{ id: 1, ... }], checking: [{ id: 2, ... }] }
 */
const createGroups = (accounts: Account[]) => {
  return Object.groupBy(accounts, (account) => account.type as AccountType);
};

/**
 *
 * Populates the projected net worth for each day
 * Optimized to reduce redundant calculations and improve efficiency
 *
 * @param projectedNetWorth
 * @param start_year
 * @param end_year
 * @param projectionsMap
 */
const generateDailyProjectedNetWorth = (
  startYear: number,
  endYear: number,
  projectionsMap: Map<number, number>
) => {
  const projectedNetWorth: NetWorthData[] = [];

  for (let year = startYear; year < endYear; year++) {
    const currentProjectedValue = projectionsMap.get(year) ?? 0;
    const nextYearProjectedValue =
      projectionsMap.get(year + 1) ?? currentProjectedValue;

    for (let day = 0; day < 365; day++) {
      const t = day / 365;
      const delta = (nextYearProjectedValue - currentProjectedValue) * t;
      const value = currentProjectedValue + delta;

      const date = new Date(year, 0, 1);
      date.setDate(day + 1);

      projectedNetWorth.push({
        date,
        close: Math.round(value * 100) / 100,
      });
    }
  }

  projectedNetWorth.push({
    date: new Date(endYear, 0, 1),
    close: Math.round((projectionsMap.get(endYear) ?? 0) * 100) / 100,
  });

  return projectedNetWorth;
};

/**
 *
 * populates the hashmap with the projected net worth
 * for each year
 * Optimized to pre-calculate holdings data outside the year loop
 *
 * @param projectionsMap
 * @param start_year
 * @param end_year
 * @param accounts
 * @returns
 */
const populateMapWithFvHoldings = ({
  projectionsMap,
  start_year,
  end_year,
  accounts,
  includes_inflation,
  annual_inflation_rate,
}: PopulateMapWithFvParams) => {
  // Pre-calculate holding data for reuse across years
  const holdingsData = accounts.flatMap((account) =>
    (account.holdings ?? []).map((holding) => {
      return getFormulaValues(holding);
    })
  );

  const yearRange = end_year - start_year;

  // Calculate future values for each year
  for (let i = 0; i <= yearRange; i++) {
    let total = 0;

    for (const { annual_return_rate, institutional_value } of holdingsData) {
      total += getFutureValue({
        present_value: institutional_value,
        annual_inflation_rate,
        annual_return_rate,
        years: i,
        includes_inflation,
      });
    }
    let year = start_year + i;
    projectionsMap.set(year, (projectionsMap.get(year) || 0) + total);
  }
};

/**
 *
 * populates the hashmap with the projected net worth
 * for each year
 * Optimized to pre-calculate account data and remove redundant conditions
 *
 * @param projectionsMap
 * @param start_year
 * @param end_year
 * @param accounts
 * @returns
 */
const populateMapWithFvAccounts = ({
  projectionsMap,
  start_year,
  end_year,
  accounts,
  includes_inflation,
  annual_inflation_rate,
}: PopulateMapWithFvParams) => {
  // Pre-calculate account data for reuse
  const accountsData = accounts.map((account) => ({
    current_amount: account.current ?? 0,
    annual_return_rate: account.annual_return_rate ?? 0,
    isNegative: account.type === "loan" || account.type === "credit",
  }));

  const yearRange = end_year - start_year + 1;

  // Calculate future values for each year
  for (let i = 0; i <= yearRange; i++) {
    let total = 0;
    for (const {
      current_amount,
      annual_return_rate,
      isNegative,
    } of accountsData) {
      let fv = getFutureValue({
        present_value: current_amount,
        annual_inflation_rate,
        annual_return_rate,
        includes_inflation: includes_inflation,
        years: i,
      });
      total += isNegative ? -fv : fv;
    }
    const year = start_year + i;
    projectionsMap.set(year, (projectionsMap.get(year) || 0) + total);
  }
};
