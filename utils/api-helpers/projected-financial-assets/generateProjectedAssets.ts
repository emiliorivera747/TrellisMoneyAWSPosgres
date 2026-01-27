import { ProjectionParams } from "@/features/projected-financial-assets/types/projectedAssets";
import { getHoldingNameV2 } from "@/utils/api-helpers/holdings/holdingAccessors";

import {
  getFormulaValues,
  getFutureValue,
} from "@/utils/api-helpers/projected-net-worth/futureValueFormulas";

import Decimal from "decimal.js";
import { constructAsset } from "@/utils/api-helpers/projected-financial-assets/createFinancialAsset";

// Type
import { ProjectedAssetWithDecimal } from "@/features/projected-financial-assets/types/projectedAssets";
import {
  GenerateAssetsFromAccountsParams,
  GroupedHoldingToAssetsParams,
  GroupedHoldingsToAssetsParams,
  CashHoldingsToAssets,
} from "@/types/future-projections/projected-assets";
import { Account } from "@/types/services/plaid/plaid";
import { GroupedHolding } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { AccountType } from "plaid";

/**
 * Generates projected financial assets for accounts.
 * @export
 * @param {ProjectionParams} params - The parameters for generating projected assets.
 * @param {number} params.startYear - The start year for projections.
 * @param {number} params.endYear - The end year for projections.
 * @param {boolean} [params.includesInflation=false] - Whether to include inflation.
 * @param {number} params.annualInflationRate - The annual inflation rate.
 * @param {Account[]} [params.accounts=[]] - The accounts to generate projections for.
 * @returns {Promise<ProjectedAssetWithDecimal[]>} A promise that resolves to an array of projected assets.
 */
export const generateProjectedAssets = async ({
  startYear,
  endYear,
  includesInflation = false,
  annualInflationRate,
  accounts = [],
}: ProjectionParams): Promise<ProjectedAssetWithDecimal[]> => {
  if (startYear > endYear || !annualInflationRate) return [];

  const years = endYear - startYear;
  const groups = Object.groupBy(accounts, ({ type }) => type || "unknown");

  const assets = Object.entries(groups).flatMap(([type, accountList]) => {
    return type === "investment"
      ? generateAssetsFromInvestments({
          accounts: accountList ?? [],
          years,
          includesInflation,
          annualInflationRate,
          type: (type || "unknown") as AccountType,
        })
      : generateAssetsFromAccounts({
          accounts: accountList ?? [],
          years,
          includesInflation,
          annualInflationRate,
          type: type as AccountType,
        });
  });
  return assets;
};

/**
 * Calculates future value for non-investment accounts.
 * @param {GenerateAssetsFromAccountsParams} params - The parameters for generating assets.
 * @returns {ProjectedAssetWithDecimal[]} An array of projected assets.
 */
const generateAssetsFromAccounts = ({
  accounts,
  years,
  includesInflation,
  annualInflationRate,
  type,
}: GenerateAssetsFromAccountsParams): ProjectedAssetWithDecimal[] =>
  accounts.map((account) => {
    const expected_annual_return_rate =
      account.expected_annual_return_rate ?? 0;

    const projection = getFutureValue({
      present_value: account.current ?? 0,
      annualInflationRate,
      expected_annual_return_rate,
      years,
      includesInflation,
    });

    return constructAsset({
      name: account.name || "",
      expected_annual_return_rate,
      projection,
      security_id: undefined,
      account_id: account.account_id,
      type,
      subtype: "cash",
      total: account?.balance?.current ?? 0,
      shares: new Decimal(0),
      accounts: [account.account_id],
    });
  });

/**
 * Calculates future value for investment holdings, consolidating by ticker symbol.
 * @param {GenerateAssetsFromAccountsParams} params - The parameters for generating assets.
 * @returns {ProjectedAssetWithDecimal[]} An array of projected assets.
 */
const generateAssetsFromInvestments = ({
  accounts,
  years,
  includesInflation,
  annualInflationRate,
  type,
}: GenerateAssetsFromAccountsParams): ProjectedAssetWithDecimal[] => {
  /**
   * Group all holdings together and sum quantities.
   */
  const groupedHoldings = groupHoldingsByTickerSymbol(accounts);

  /**
   * Get the cash holdings
   */
  const cashHoldings = getCashHoldingsFromAccounts(accounts);

  /**
   * Get the cash assets
   */
  const cashAssets = cashHoldingsToAssets({
    cash_holdings: cashHoldings,
    years,
    includesInflation,
    annualInflationRate,
    type,
  });

  /**
   * Get grouped holding values
   */
  const groupedHoldingValues = Array.from(groupedHoldings.values());

  /**
   * Get the holding assets
   */
  const holdingAssets = groupedHoldingsToAssets({
    grouped_holdings: groupedHoldingValues,
    years,
    includesInflation,
    annualInflationRate,
    type,
  });

  return [...holdingAssets, ...cashAssets];
};

const cashHoldingsToAssets = ({
  cash_holdings,
  annualInflationRate,
  years,
  type,
  includesInflation,
}: CashHoldingsToAssets) => {
  const cashAssets = cash_holdings.map((holding) => {
    const { quantity, expected_annual_return_rate, institutional_value } =
      getFormulaValues(holding);

    const projection = getFutureValue({
      present_value: institutional_value,
      expected_annual_return_rate,
      annualInflationRate,
      years,
      includesInflation,
    });

    return constructAsset({
      name: holding.accountName + " - Cash",
      expected_annual_return_rate,
      projection,
      security_id: holding?.security?.security_id || "",
      account_id: holding.account_id || "",
      type,
      subtype: "cash",
      total: institutional_value,
      shares: new Decimal(quantity || 0),
      accounts: [holding.account_id || ""],
    });
  });
  return cashAssets;
};

/**
 * Extracts and returns an array of cash holdings from a list of accounts.
 * This function iterates through the provided accounts, filters the holdings
 * to include only those with a security type of "cash", and maps them to include
 * the account name for each holding.
 * @param {Account[]} accounts - An array of account objects, each containing holdings and an account name.
 * @returns {Array} An array of cash holdings, each enriched with the account name.
 */
const getCashHoldingsFromAccounts = (accounts: Account[]) => {
  const cashHoldings = accounts.flatMap(
    ({ holdings = [], name: accountName }) =>
      holdings
        .filter((holding) => holding?.security?.type === "cash")
        .map((holding) => ({
          ...holding,
          accountName: accountName || "",
        }))
  );
  return cashHoldings;
};

/**
 * Converts the grouped holdings to assets.
 * @param {GroupedHoldingsToAssetsParams} params - The parameters for converting holdings.
 * @returns {ProjectedAssetWithDecimal[]} An array of projected assets.
 */
const groupedHoldingsToAssets = ({
  grouped_holdings,
  years,
  includesInflation,
  annualInflationRate,
  type,
}: GroupedHoldingsToAssetsParams): ProjectedAssetWithDecimal[] => {
  return grouped_holdings.map((grouped_holding) =>
    groupedHoldingToAsset({
      grouped_holding,
      years,
      includesInflation,
      annualInflationRate,
      type,
    })
  );
};

/**
 * Aggregates holdings by ticker symbol.
 * @param {Account[]} accounts - The accounts containing holdings.
 * @returns {Map<string, GroupedHolding>} A map of ticker symbols to grouped holdings.
 */
const groupHoldingsByTickerSymbol = (
  accounts: Account[]
): Map<string, GroupedHolding> => {
  const holdings = accounts.flatMap((account) => account.holdings);
  const groupedHoldingsMap = new Map<string, GroupedHolding>();

  for (let holding of holdings) {
    const ticker_symbol = holding?.security?.ticker_symbol ?? "";
    const subtype = holding?.security?.type || "unknown";
    if (!ticker_symbol || subtype === "cash" || !holding) continue;
    const { quantity, expected_annual_return_rate, institutional_value } =
      getFormulaValues(holding);

    const groupedHolding = groupedHoldingsMap.get(ticker_symbol) || {
      security_id: holding?.security?.security_id || "",
      name: getHoldingNameV2(holding, ""),
      quantity: new Decimal(0),
      institution_value: new Decimal(0),
      expected_annual_return_rate: new Decimal(
        expected_annual_return_rate || 0
      ).toNumber(),
      subtype: holding?.security?.type || "unknown",
      account_id: holding.account_id || "",
      accounts: [holding.account_id],
    };

    groupedHolding.quantity = groupedHolding.quantity.plus(quantity || 0);
    groupedHolding.institution_value = groupedHolding.institution_value.plus(
      institutional_value || 0
    );
    groupedHolding.accounts = Array.from(
      new Set([...groupedHolding.accounts, holding.account_id || ""])
    );
    groupedHoldingsMap.set(ticker_symbol, groupedHolding);
  }
  return groupedHoldingsMap;
};

/**
 * Get all holdings with cash subtype
 */

/**
 * Transforms a holding aggregate into an asset.
 * @param {GroupedHoldingToAssetsParams} params - The parameters for converting a grouped holding.
 * @returns {ProjectedAssetWithDecimal} A projected asset.
 */
const groupedHoldingToAsset = ({
  grouped_holding,
  years,
  includesInflation,
  annualInflationRate,
  type,
}: GroupedHoldingToAssetsParams): ProjectedAssetWithDecimal => {
  const {
    security_id,
    name,
    quantity,
    institution_value,
    expected_annual_return_rate,
    subtype,
    account_id,
    accounts,
  } = grouped_holding;

  const projection = getFutureValue({
    present_value: institution_value,
    expected_annual_return_rate,
    annualInflationRate,
    years,
    includesInflation: includesInflation,
  });

  return constructAsset({
    name,
    expected_annual_return_rate,
    projection,
    security_id,
    account_id,
    type: type ?? AccountType.Other,
    subtype,
    total: institution_value,
    shares: quantity,
    accounts,
  });
};
