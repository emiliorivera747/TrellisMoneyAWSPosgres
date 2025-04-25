import { Account } from "@/types/plaid";
import { FinancialAssets } from "@/features/projected-financial-assets/types/projectedAssets";
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

// Configuration for financial projections
interface ProjectionConfig {
  years: number;
  with_inflation: boolean;
  annual_inflation_rate: number;
  type: AccountType;
}

// Parameters for generating financial assets
interface ProjectionParams {
  start_year: number;
  end_year: number;
  with_inflation?: boolean;
  annual_inflation_rate: number;
  accounts?: Account[];
}

interface createFinancialAssetParams {
  name: string;
  annual_return_rate: number;
  projection: number;
  security_id: string | null;
  account_id: string;
  type: AccountType;
  subtype: string;
  total: number | Decimal;
  shares: Decimal;
}
// Factory function to create FinancialAssets objects
const createFinancialAsset = ({
  name,
  annual_return_rate,
  projection,
  security_id,
  account_id,
  type,
  subtype,
  total,
  shares,
}: createFinancialAssetParams): FinancialAssets => ({
  name,
  annual_growth_rate: new Decimal(annual_return_rate).toDecimalPlaces(2),
  projection: new Decimal(projection).toDecimalPlaces(2),
  security_id,
  account_id,
  type,
  subtype,
  total: new Decimal(total).toDecimalPlaces(2),
  shares: shares,
});

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
  // Validate inputs
  if (start_year > end_year || !Number.isFinite(annual_inflation_rate)) {
    return [];
  }

  const years = end_year - start_year;
  const groups = Object.groupBy(accounts, ({ type }) => type);

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
      name: account.name,
      annual_return_rate,
      projection,
      security_id: null,
      account_id: account.account_id,
      type,
      subtype: "cash",
      total: account.balances?.current ?? 0,
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
  const aggregates = new Map<string, HoldingAggregate>();

  // Aggregate holdings by ticker symbol
  accounts.forEach(({ holdings = [], name, account_id }) =>
    holdings.forEach((holding) => {
      const ticker_symbol = holding?.security?.ticker_symbol ?? "";
      if (!ticker_symbol) return;

      const { quantity, annual_return_rate, institutional_value } =
        getFormulaValues(holding);

      const aggregate = aggregates.get(ticker_symbol) ?? {
        security_id: holding?.security?.security_id ?? "",
        name: getHoldingNameV2(holding, name),
        quantity: new Decimal(0),
        institution_value: new Decimal(0),
        annual_return_rate:
          annual_return_rate instanceof Decimal
            ? annual_return_rate.toNumber()
            : annual_return_rate ?? 0,
        subtype: holding?.security?.type ?? "unknown",
        account_id: holding.account_id ?? account_id,
      };

      aggregate.quantity = aggregate.quantity.plus(quantity || 0);
      aggregate.institution_value = aggregate.institution_value.plus(
        institutional_value || 0
      );

      aggregates.set(ticker_symbol, aggregate);
    })
  );

  // Transform aggregates into financial assets
  return Array.from(aggregates, ([, aggregate]) => {
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
  });
};
