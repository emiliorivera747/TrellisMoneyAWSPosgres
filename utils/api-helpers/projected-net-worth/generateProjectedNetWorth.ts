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
  const projectedNetWorth: NetWorthData[] = [];

  /** 
   * Early exit
   */
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
  // console.log("projectionsMap", projectionsMap);
  pushProjectedNetWorthToEachDay(
    projectedNetWorth,
    start_year,
    end_year,
    projectionsMap
  );
  return projectedNetWorth;
};

/**
 * Groups an array of accounts by their account type.
 *
 * @param accounts - An array of `Account` objects to be grouped.
 * @returns An object where the keys are `AccountType` values and the values are arrays of `Account` objects
 *          that belong to each respective account type.
 *
 * @remarks
 * This function uses `Object.groupBy` to group the accounts based on their `type` property.
 * Ensure that the `Account` type and `AccountType` enum are properly defined in your codebase.
 *
 * @example
 * ```typescript
 * const accounts: Account[] = [
 *   { id: 1, type: 'savings', balance: 1000 },
 *   { id: 2, type: 'checking', balance: 500 },
 *   { id: 3, type: 'savings', balance: 2000 },
 * ];
 *
 * const groupedAccounts = createGroups(accounts);
 * console.log(groupedAccounts);
 * // Output:
 * // {
 * //   savings: [
 * //     { id: 1, type: 'savings', balance: 1000 },
 * //     { id: 3, type: 'savings', balance: 2000 }
 * //   ],
 * //   checking: [
 * //     { id: 2, type: 'checking', balance: 500 }
 * //   ]
 * // }
 * ```
 */
const createGroups = (accounts: Account[]) => {
  const groups = Object.groupBy(
    accounts,
    (account) => account.type as AccountType
  );

  return groups;
};

/**
 *
 * populates the projected net worth for each day
 * Optimized to reduce redundant calculations and improve efficiency
 *
 * @param projectedNetWorth
 * @param start_year
 * @param end_year
 * @param projectionsMap
 */
const pushProjectedNetWorthToEachDay = (
  projectedNetWorth: { date: Date; close: number }[],
  start_year: number,
  end_year: number,
  projectionsMap: Map<number, number>
) => {
  const days = (end_year - start_year) * 365;

  // In pushProjectedNetWorthToEachDay
  for (let i = 0; i <= days; i++) {
    const year = start_year + Math.floor(i / 365);
    const dayOfYear = i % 365;

    // Remove or comment out this line - almost never wanted
    // if (year === end_year && dayOfYear >= 30) break;

    const value = projectionsMap.get(year) ?? 0;

    // If you really want smooth line between years:
    let interpolatedValue = value;
    if (year < end_year) {
      const next = projectionsMap.get(year + 1) ?? value;
      const f = dayOfYear / 365;
      interpolatedValue += (next - value) * f;
    }

    const date = new Date(year, 0, 1);
    date.setDate(date.getDate() + dayOfYear);

    projectedNetWorth.push({
      date,
      close: Math.round(interpolatedValue * 100) / 100,
    });

    // Optional: early exit at end of last year
    if (year === end_year && dayOfYear >= 364) break;
  }
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
  for (let i = 0; i < yearRange; i++) {
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
