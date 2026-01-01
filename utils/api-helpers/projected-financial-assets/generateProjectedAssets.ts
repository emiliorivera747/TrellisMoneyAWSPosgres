import { Account } from "@/types/plaid";
import {
  AssetsProjectionConfig,
  ProjectionParams,
} from "@/features/projected-financial-assets/types/projectedAssets";

import { getHoldingNameV2 } from "@/utils/api-helpers/holdings/holdingAccessors";
import {
  AccountType,
  HoldingAggregate,
} from "@/features/projected-financial-assets/types/projectedAssetsCard";

import {
  getFormulaValues,
  getFutureValue,
} from "@/utils/api-helpers/projected-net-worth/futureValueFormulas";

import Decimal from "decimal.js";
import { createFinancialAsset } from "@/utils/api-helpers/projected-financial-assets/createFinancialAsset";

// Type
import { Assets } from "@/types/assets";
import { GenerateAssetsFromAccountsParams } from "@/types/projectedAssets";

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
  const aggregates = aggregateHoldingsByTicker(accounts);

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

  const aggregatesRes = Array.from(aggregates.values()).map((aggregate) =>
    transformAggregateToFinancialAsset(aggregate, {
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
const aggregateHoldingsByTicker = (
  accounts: Account[]
): Map<string, HoldingAggregate> => {
  const aggregates = new Map<string, HoldingAggregate>();

  accounts.forEach(({ holdings = [], name, account_id }) =>
    holdings.forEach((holding) => {
      const ticker_symbol = holding?.security?.ticker_symbol ?? "";
      const subtype = holding?.security?.type || "unknown";
      if (!ticker_symbol || subtype === "cash") return;

      const { quantity, annual_return_rate, institutional_value } =
        getFormulaValues(holding);

      const aggregate = aggregates.get(ticker_symbol) || {
        security_id: holding?.security?.security_id || "",
        name: getHoldingNameV2(holding, name || ""),
        quantity: new Decimal(0),
        institution_value: new Decimal(0),
        annual_return_rate: new Decimal(annual_return_rate || 0).toNumber(),
        subtype: holding?.security?.type || "unknown",
        account_id: holding.account_id || account_id,
      };

      aggregate.quantity = aggregate.quantity.plus(quantity || 0);
      aggregate.institution_value = aggregate.institution_value.plus(
        institutional_value || 0
      );

      aggregates.set(ticker_symbol, aggregate);
    })
  );

  return aggregates;
};

/**
 * Get all holdings with cash subtype
 */

/**
 * Transforms a holding aggregate into a financial asset.
 */
const transformAggregateToFinancialAsset = (
  aggregate: HoldingAggregate,
  {
    years,
    includes_inflation,
    annual_inflation_rate,
    type,
  }: AssetsProjectionConfig
): Assets => {
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
