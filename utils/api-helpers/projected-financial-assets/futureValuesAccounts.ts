import { Account } from "@/types/plaid";

import { getHoldingName } from "@/utils/api-helpers/holdings/holdingAccessors";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import {
  getFutureValue,
  getFormulaValues,
} from "@/utils/api-helpers/projected-net-worth/futureValueFormulas";

import Decimal from "decimal.js";

/**
 *
 * Calculates the future value of accounts
 *
 * @param accounts
 * @param start_year
 * @param end_year
 * @param includes_inflation
 * @param annual_inflation_rate
 * @param type
 * @returns
 */
export const calculate_fv_accounts = (
  accounts: Account[],
  start_year: number,
  end_year: number,
  includes_inflation: boolean,
  annual_inflation_rate: number,
  type: AccountType
) => {
  const res = [];

  for (const account of accounts) {
    const { expected_expected_annual_return_rate, current } = account;

    let fv = getFutureValue({
      present_value: Number(current),
      annual_inflation_rate,
      expected_expected_annual_return_rate: expected_expected_annual_return_rate ?? 0,
      includes_inflation: includes_inflation,
      years: end_year - start_year,
    });

    res.push({
      name: account.name,
      expected_expected_annual_return_rate: new Decimal(expected_expected_annual_return_rate ?? 0).toDecimalPlaces(
        2
      ),
      projection: new Decimal(fv).toDecimalPlaces(2),
      security_id: null,
      account_id: account.account_id,
      type: type,
      shares: new Decimal(0),
    });
  }

  return res;
};

/**
 *
 * Calculates the future value of holdings
 *
 * @param accounts
 * @param start_year
 * @param end_year
 * @param includes_inflation
 * @param annual_inflation_rate
 * @param type
 * @returns
 */
export const calculate_fv_holdings = (
  accounts: Account[],
  start_year: number,
  end_year: number,
  includes_inflation: boolean,
  annual_inflation_rate: number,
  type: AccountType
) => {
  const res = [];
  for (const account of accounts) {
    const holdings = account.holdings ?? [];
    for (const holding of holdings) {
      const { quantity, close_price, expected_expected_annual_return_rate } =
        getFormulaValues(holding);

      let fv = getFutureValue({
        present_value: Number(quantity) * Number(close_price),
        annual_inflation_rate,
        expected_expected_annual_return_rate,
        includes_inflation: includes_inflation,
        years: end_year - start_year,
      });

      res.push({
        name: getHoldingName(holding),
        expected_expected_annual_return_rate: new Decimal(expected_expected_annual_return_rate).toDecimalPlaces(2),
        projection: new Decimal(fv).toDecimalPlaces(2),
        security_id: holding.security_id,
        account_id: holding.account_id,
        type: type,
        shares: new Decimal(holding.quantity || 0),
      });
    }
  }
  return res;
};
