import { Account } from "@/types/services/plaid/plaid";
import { AccountType } from "plaid";
import { NetWorthData } from "@/features/projected-net-worth/types/projectedNetWorth";

// Helpers
import {
  getFutureValue,
  getFormulaValues,
} from "@/utils/api-helpers/projected-net-worth/futureValueFormulas";
import { PopulateMapWithFvParams } from "@/types/future-projections/projected-net-worth";

/**
 * Generates the projected net worth over a range of years based on the provided accounts.
 * 
 * @export
 * @param {Account[]} accounts - An array of account objects containing holdings and balances.
 * @param {number} start_year - The start year for the projection.
 * @param {number} end_year - The end year for the projection.
 * @param {boolean} includes_inflation - Whether to include inflation in the calculations.
 * @param {number} annual_inflation_rate - The annual inflation rate.
 * @returns {Promise<NetWorthData[]>} A promise that resolves to an array of objects, each representing the projected net worth for a specific date.
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
 * @param {Account[]} accounts - Array of `Account` objects.
 * @returns {Record<AccountType, Account[]>} Object with `AccountType` keys and arrays of `Account` objects.
 */
const createGroups = (accounts: Account[]) => {
  return Object.groupBy(accounts, (account) => account.type as AccountType);
};

/**
 * Populates the projected net worth for each day.
 * Optimized to reduce redundant calculations and improve efficiency.
 * 
 * @param {number} startYear - The start year for the projection.
 * @param {number} endYear - The end year for the projection.
 * @param {Map<number, number>} projectionsMap - A map of year to projected value.
 * @returns {NetWorthData[]} An array of projected net worth data points.
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
        value: Math.round(value * 100) / 100,
      });
    }
  }

  projectedNetWorth.push({
    date: new Date(endYear, 0, 1),
    value: Math.round((projectionsMap.get(endYear) ?? 0) * 100) / 100,
  });

  return projectedNetWorth;
};

/**
 * Populates the hashmap with the projected net worth for each year.
 * Optimized to pre-calculate holdings data outside the year loop.
 * 
 * @param {PopulateMapWithFvParams} params - The parameters for populating the map.
 * @param {Map<number, number>} params.projectionsMap - The map to populate.
 * @param {number} params.start_year - The start year.
 * @param {number} params.end_year - The end year.
 * @param {Account[]} params.accounts - The accounts containing holdings.
 * @param {boolean} params.includes_inflation - Whether to include inflation.
 * @param {number} params.annual_inflation_rate - The annual inflation rate.
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

    for (const { expected_annual_return_rate, institutional_value } of holdingsData) {
      total += getFutureValue({
        present_value: institutional_value,
        annual_inflation_rate,
        expected_annual_return_rate,
        years: i,
        includes_inflation,
      });
    }
    let year = start_year + i;
    projectionsMap.set(year, (projectionsMap.get(year) || 0) + total);
  }
};

/**
 * Populates the hashmap with the projected net worth for each year.
 * Optimized to pre-calculate account data and remove redundant conditions.
 * 
 * @param {PopulateMapWithFvParams} params - The parameters for populating the map.
 * @param {Map<number, number>} params.projectionsMap - The map to populate.
 * @param {number} params.start_year - The start year.
 * @param {number} params.end_year - The end year.
 * @param {Account[]} params.accounts - The accounts.
 * @param {boolean} params.includes_inflation - Whether to include inflation.
 * @param {number} params.annual_inflation_rate - The annual inflation rate.
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
    expected_annual_return_rate: account.expected_annual_return_rate ?? 0,
    isNegative: account.type === "loan" || account.type === "credit",
  }));

  const yearRange = end_year - start_year + 1;

  // Calculate future values for each year
  for (let i = 0; i <= yearRange; i++) {
    let total = 0;
    for (const {
      current_amount,
      expected_annual_return_rate,
      isNegative,
    } of accountsData) {
      let fv = getFutureValue({
        present_value: current_amount,
        annual_inflation_rate,
        expected_annual_return_rate,
        includes_inflation: includes_inflation,
        years: i,
      });
      total += isNegative ? -fv : fv;
    }
    const year = start_year + i;
    projectionsMap.set(year, (projectionsMap.get(year) || 0) + total);
  }
};
