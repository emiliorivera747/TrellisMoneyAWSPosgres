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

/**
 * Generates projected financial assets for accounts.
 */
export const generateProjectedFinancialAssets = async (
  start_year: number,
  end_year: number,
  with_inflation: boolean = false,
  annual_inflation_rate: number,
  accounts: Account[] = []
): Promise<FinancialAssets[]> => {
  // Validate inputs
  if (start_year > end_year || !Number.isFinite(annual_inflation_rate))
    return [];

  const years = end_year - start_year;

  const groups = Object.groupBy(accounts, (account) => account.type);

  return Object.entries(groups).flatMap(([type, accounts]) =>
    type === "investment"
      ? calculateFvHoldings(
          accounts ?? [],
          years,
          with_inflation,
          annual_inflation_rate,
          type as AccountType
        )
      : calculateFvAccounts(
          accounts ?? [],
          years,
          with_inflation,
          annual_inflation_rate,
          type as AccountType
        )
  );
};

/**
 * Calculates future value for non-investment accounts.
 */
const calculateFvAccounts = (
  accounts: Account[],
  years: number,
  with_inflation: boolean,
  annual_inflation_rate: number,
  type: AccountType
): FinancialAssets[] => {
  return accounts.map((account) => {
    const annual_return_rate = account.annual_return_rate ?? 0;
    const current_amount = account.current ?? 0;

    const fv = calculateFutureValue({
      value: current_amount,
      annual_return_rate,
      annual_inflation_rate,
      years,
      with_inflation,
    });

    return {
      name: account.name,
      annual_growth_rate: new Decimal(annual_return_rate).toDecimalPlaces(2),
      projection: new Decimal(fv).toDecimalPlaces(2),
      security_id: null,
      account_id: account.account_id,
      type,
      subtype: "cash",
      total: account.balances?.current ?? 0,
      shares: new Decimal(0),
    };
  });
};

/**
 * Calculates future value for investment holdings, consolidating by ticker_symbol.
 */
const calculateFvHoldings = (
  accounts: Account[],
  years: number,
  with_inflation: boolean,
  annual_inflation_rate: number,
  type: AccountType
): FinancialAssets[] => {
  // Use Map for better performance with large datasets
  const holdingMap = new Map<string, HoldingAggregate>();

  // Aggregate holdings by ticker_symbol
  for (const account of accounts) {
    const holdings = account.holdings ?? [];
    for (const holding of holdings) {
      const ticker_symbol = holding?.security?.ticker_symbol ?? "";
      if (!ticker_symbol) continue; // Skip if no ticker_symbol

      const { quantity, annual_return_rate, institutional_value } =
        getFormulaValues(holding);

      const current = holdingMap.get(ticker_symbol) ?? {
        security_id: holding?.security?.security_id ?? "",
        name: getHoldingNameV2(holding, account.name),
        quantity: new Decimal(0),
        institution_value: new Decimal(0),
        annual_return_rate:
          annual_return_rate instanceof Decimal
            ? annual_return_rate.toNumber()
            : annual_return_rate ?? 0,
        subtype: holding?.security?.type ?? "unknown",
        account_id: holding.account_id ?? "",
      };

      current.quantity = current.quantity.plus(quantity || 0);
      current.institution_value = current.institution_value.plus(
        institutional_value || 0
      );

      holdingMap.set(ticker_symbol, current);
    }
  }

  // Calculate future value for each unique security
  return Array.from(holdingMap.entries()).map(
    ([
      ticker_symbol,
      {
        security_id,
        name,
        quantity,
        institution_value,
        annual_return_rate,
        subtype,
        account_id,
      },
    ]) => {
      const fv = calculateFutureValue({
        value: institution_value,
        annual_return_rate,
        annual_inflation_rate,
        years,
        with_inflation,
      });

      return {
        name,
        annual_growth_rate: new Decimal(annual_return_rate).toDecimalPlaces(2),
        projection: new Decimal(fv).toDecimalPlaces(2),
        security_id,
        account_id,
        type,
        subtype,
        total: institution_value.toDecimalPlaces(2),
        shares: quantity,
      };
    }
  );
};
