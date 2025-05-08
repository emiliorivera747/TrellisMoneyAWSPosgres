import { Account } from "@/types/plaid";
import {
  FinancialAssets,
  ProjectionConfig,
  ProjectionParams,
} from "@/features/projected-financial-assets/types/projectedAssets";
import { getHoldingNameV2 } from "@/utils/api-helpers/holdingAccessors";
import {
  AccountType,
  HoldingAggregate,
} from "@/features/projected-financial-assets/types/projectedAssetsCard";

import {
  calculateFutureValue,
  getFormulaValues,
} from "@/utils/api-helpers/futureValueFormulas";

import Decimal from "decimal.js";
import { createFinancialAsset } from "@/utils/api-helpers/projected-financial-assets/createFinancialAsset";

/**
 * Generates projected financial assets for accounts.
 */
export const generateProjectedFinancialAssets = async ({
  start_year,
  end_year,
  with_inflation = false,
  annual_inflation_rate,
  accounts = [],
}: ProjectionParams): Promise<FinancialAssets[]> => {
  if (start_year > end_year || !Number.isFinite(annual_inflation_rate))
    return [];

  const years = end_year - start_year;
  const groups = Object.groupBy(accounts, ({ type }) => type || "unknown");

  return Object.entries(groups).flatMap(([type, accountList]) => {
    const config: ProjectionConfig = {
      years,
      with_inflation,
      annual_inflation_rate,
      type: type as AccountType,
    };
    return type === "investment"
      ? calculateInvestmentAssets(accountList ?? [], config)
      : calculateAccountAssets(accountList ?? [], config);
  });
};

/**
 * Calculates future value for non-investment accounts.
 */
const calculateAccountAssets = (
  accounts: Account[],
  { years, with_inflation, annual_inflation_rate, type }: ProjectionConfig
): FinancialAssets[] =>
  accounts.map((account) => {
    const annual_return_rate = account.annual_return_rate ?? 0;
    const current_amount = account.current ?? 0;

    const projection = calculateFutureValue({
      value: current_amount,
      annual_return_rate,
      annual_inflation_rate,
      years,
      with_inflation,
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
const calculateInvestmentAssets = (
  accounts: Account[],
  { years, with_inflation, annual_inflation_rate, type }: ProjectionConfig
): FinancialAssets[] => {
  const aggregates = aggregateHoldingsByTicker(accounts);
  const cashHoldings = accounts.flatMap(({ holdings = [], name: accountName }) =>
    holdings.filter((holding) => holding?.security?.type === "cash").map((holding) => ({
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
      projection: calculateFutureValue({
        value: institutional_value,
        annual_return_rate,
        annual_inflation_rate,
        years,
        with_inflation,
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
      with_inflation,
      annual_inflation_rate,
      type,
    })
  );

  // Transform aggregates into financial assets
  return [...aggregatesRes, ...cashAssets]
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
      if (!ticker_symbol || subtype === "cash" ) return;

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
  { years, with_inflation, annual_inflation_rate, type }: ProjectionConfig
): FinancialAssets => {
  const {
    security_id,
    name,
    quantity,
    institution_value,
    annual_return_rate,
    subtype,
    account_id,
  } = aggregate;

  const projection = calculateFutureValue({
    value: institution_value,
    annual_return_rate,
    annual_inflation_rate,
    years,
    with_inflation,
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
