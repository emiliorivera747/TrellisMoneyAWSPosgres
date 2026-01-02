import { Account } from "@/types/plaid";
import { ProjectionParams } from "@/features/projected-financial-assets/types/projectedAssets";

import { getHoldingNameV2 } from "@/utils/api-helpers/holdings/holdingAccessors";
import {
  AccountType,
  GroupedHolding,
} from "@/features/projected-financial-assets/types/projectedAssetsCard";

import {
  getFormulaValues,
  getFutureValue,
} from "@/utils/api-helpers/projected-net-worth/futureValueFormulas";

import Decimal from "decimal.js";
import { createFinancialAsset } from "@/utils/api-helpers/projected-financial-assets/createFinancialAsset";

// Type
import { Assets } from "@/types/assets";
import {
  GenerateAssetsFromAccountsParams,
  GroupedHoldingToAssetsParams,
} from "@/types/projectedAssets";

/**
 * Generates projected financial assets for accounts.
 */
export const generateProjectedAssets = async ({
  start_year,
  end_year,
  includes_inflation = false,
  annual_inflation_rate,
  accounts = [],
}: ProjectionParams): Promise<Assets[]> => {
  if (start_year > end_year || !annual_inflation_rate) return [];

  const years = end_year - start_year;
  const groups = Object.groupBy(accounts, ({ type }) => type || "unknown");

  return Object.entries(groups).flatMap(([type, accountList]) => {
    return type === "investment"
      ? generateAssetsFromInvestments({
          accounts: accountList ?? [],
          years,
          includes_inflation,
          annual_inflation_rate,
          type,
        })
      : generateAssetsFromAccounts({
          accounts: accountList ?? [],
          years,
          includes_inflation,
          annual_inflation_rate,
          type: type as AccountType,
        });
  });
};

/**
 * Calculates future value for non-investment accounts.
 */
const generateAssetsFromAccounts = ({
  accounts,
  years,
  includes_inflation,
  annual_inflation_rate,
  type,
}: GenerateAssetsFromAccountsParams): Assets[] =>
  accounts.map((account) => {
    const annual_return_rate = account.annual_return_rate ?? 0;

    const projection = getFutureValue({
      present_value: account.current ?? 0,
      annual_inflation_rate,
      annual_return_rate,
      years,
      includes_inflation,
    });

    return createFinancialAsset({
      name: account.name || "",
      annual_return_rate,
      projection,
      security_id: null,
      account_id: account.account_id,
      type,
      subtype: "cash",
      total: account?.balance?.current ?? 0,
      shares: new Decimal(0),
    });
  });

/**
 * Calculates future value for investment holdings, consolidating by ticker symbol.
 */
const generateAssetsFromInvestments = ({
  accounts,
  years,
  includes_inflation,
  annual_inflation_rate,
  type,
}: GenerateAssetsFromAccountsParams): Assets[] => {


  /**
   * Group all holdings together and sum quantities.
   */
  const groupedHoldings = groupHoldingsByTickerSymbol(accounts);


  
  const cashHoldings = accounts.flatMap(
    ({ holdings = [], name: accountName }) =>
      holdings
        .filter((holding) => holding?.security?.type === "cash")
        .map((holding) => ({
          ...holding,
          accountName,
        }))
  );

  // Add cash holdings to the aggregates
  const cashAssets = cashHoldings.map((holding) => {
    const { quantity, annual_return_rate, institutional_value } =
      getFormulaValues(holding);

    return createFinancialAsset({
      name: holding.accountName + " - Cash",
      annual_return_rate,
      projection: getFutureValue({
        present_value: institutional_value,
        annual_return_rate,
        annual_inflation_rate,
        years,
        includes_inflation: includes_inflation,
      }),
      security_id: holding?.security?.security_id || "",
      account_id: holding.account_id || "",
      type,
      subtype: "cash",
      total: institutional_value,
      shares: new Decimal(quantity || 0),
    });
  });

  const aggregatesRes = Array.from(groupedHoldings.values()).map((aggregate) =>
    groupedHoldingToAssets({
      aggregate,
      years,
      includes_inflation,
      annual_inflation_rate,
      type,
    })
  );

  // Transform aggregates into financial assets
  return [...aggregatesRes, ...cashAssets];
};

/**
 * Aggregates holdings by ticker symbol.
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
    const { quantity, annual_return_rate, institutional_value } =
      getFormulaValues(holding);

    const groupedHolding = groupedHoldingsMap.get(ticker_symbol) || {
      security_id: holding?.security?.security_id || "",
      name: getHoldingNameV2(holding, ""),
      quantity: new Decimal(0),
      institution_value: new Decimal(0),
      annual_return_rate: new Decimal(annual_return_rate || 0).toNumber(),
      subtype: holding?.security?.type || "unknown",
      account_id: holding.account_id || "",
    };

    groupedHolding.quantity = groupedHolding.quantity.plus(quantity || 0);

    groupedHolding.institution_value = groupedHolding.institution_value.plus(
      institutional_value || 0
    );

    groupedHoldingsMap.set(ticker_symbol, groupedHolding);
  }
  return groupedHoldingsMap;
};

/**
 * Get all holdings with cash subtype
 */

/**
 * Transforms a holding aggregate into a asset.
 */
const groupedHoldingToAssets = ({
  aggregate,
  years,
  includes_inflation,
  annual_inflation_rate,
  type,
}: GroupedHoldingToAssetsParams): Assets => {
  const {
    security_id,
    name,
    quantity,
    institution_value,
    annual_return_rate,
    subtype,
    account_id,
  } = aggregate;

  const projection = getFutureValue({
    present_value: institution_value,
    annual_return_rate,
    annual_inflation_rate,
    years,
    includes_inflation: includes_inflation,
  });

  return createFinancialAsset({
    name,
    annual_return_rate,
    projection,
    security_id,
    account_id,
    type,
    subtype,
    total: institution_value,
    shares: quantity,
  });
};
