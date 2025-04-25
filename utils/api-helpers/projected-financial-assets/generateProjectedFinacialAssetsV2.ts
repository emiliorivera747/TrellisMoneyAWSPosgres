import { Account } from "@/types/plaid";
import { FinancialAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import {
  getHoldingNameV2,
  getInstitutionalValue,
  getTotal,
} from "@/utils/api-helpers/holdingAccessors";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";

import {
  future_value_with_inflation_fn,
  future_value_fn,
  future_value_fn_v2,
  future_value_with_inflation_fn_v2,
  getFormulaValues,
} from "@/utils/api-helpers/futureValueFormulas";
import Decimal from "decimal.js";

/**
 *
 * @param start_year
 * @param end_year
 * @param with_inflation
 * @param annual_inflation_rate
 * @param accounts
 * @returns
 */
export const generateProjectedFinancialAssetsV2 = async (
  start_year: number,
  end_year: number,
  with_inflation: boolean = false,
  annual_inflation_rate: number,
  accounts: Account[]
): Promise<FinancialAssets[] | []> => {
  const groups = Object.groupBy(accounts, (account) => account.type);

  const assets = [];

  for (let key in groups) {
    const accounts = groups[key];
    if (key === "investment") {
      let res = calculate_fv_holdings(
        accounts ?? [],
        start_year,
        end_year,
        with_inflation,
        annual_inflation_rate,
        key as AccountType
      );
      assets.push(...res);
    } else {
      let res = calculate_fv_accounts(
        accounts ?? [],
        start_year,
        end_year,
        with_inflation,
        annual_inflation_rate,
        key as AccountType
      );
      assets.push(...res);
    }
  }
  return assets;
};

const calculate_fv_accounts = (
  accounts: Account[],
  start_year: number,
  end_year: number,
  with_inflation: boolean,
  annual_inflation_rate: number,
  type: AccountType
) => {
  const res = [];

  for (const account of accounts) {
    const annual_return_rate = account.annual_return_rate;
    const current_amount = account.current;
    let fv;
    if (with_inflation) {
      fv = future_value_with_inflation_fn(
        1,
        current_amount ?? 0,
        annual_return_rate ?? 0,
        annual_inflation_rate,
        end_year - start_year
      );
    } else {
      fv = future_value_fn(
        1,
        current_amount ?? 0,
        annual_return_rate ?? 0,
        end_year - start_year
      );
    }

    res.push({
      name: account.name,
      annual_growth_rate: new Decimal(annual_return_rate ?? 0).toDecimalPlaces(
        2
      ),
      projection: new Decimal(fv).toDecimalPlaces(2),
      security_id: null,
      account_id: account.account_id,
      type: type,
      subtype: "cash",
      total: account.balances?.current,
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
 * @param with_inflation
 * @param annual_inflation_rate
 * @param type
 * @returns
 */
const calculate_fv_holdings = (
  accounts: Account[],
  start_year: number,
  end_year: number,
  with_inflation: boolean,
  annual_inflation_rate: number,
  type: AccountType
) => {
  // Step 1: Group holdings by security_id
  const holdingMap: {
    [ticker_symbol: string]: {
      name: string;
      quantity: Decimal;
      total: Decimal;
      institution_value: Decimal | number;
      close_price: Decimal | number;
      annual_return_rate: number;
      subtype: string;
      account_id: string; // Keep first account_id for simplicity
    };
  } = {};

  /**
   * Go through all of the accounts
   */
  for (const account of accounts) {
    /**
     * Get all of the holdings for the account
     */
    const holdings = account.holdings ?? [];

    /**
     * Go through all of the holdings
     */
    for (const holding of holdings) {
      const { quantity, annual_return_rate, institutional_value, close_price } =
        getFormulaValues(holding);

      const ticker_symbol = holding?.security?.ticker_symbol ?? "";

      if (!holdingMap[ticker_symbol]) {
        holdingMap[ticker_symbol] = {
          name: getHoldingNameV2(holding, account.name),
          quantity: new Decimal(0),
          close_price: close_price,
          total: new Decimal(0),
          institution_value: new Decimal(0),
          annual_return_rate:
            annual_return_rate instanceof Decimal
              ? annual_return_rate.toNumber()
              : annual_return_rate ?? 0,
          subtype: holding?.security?.type ?? "unknown",
          account_id: holding.account_id ?? "unknown",
        };
      }

      // Accumulate quantity and total
      holdingMap[ticker_symbol].quantity = holdingMap[
        ticker_symbol
      ].quantity.plus(new Decimal(quantity || 0));

      holdingMap[ticker_symbol].total = holdingMap[ticker_symbol].total.plus(
        new Decimal(getInstitutionalValue(holding))
      );

      holdingMap[ticker_symbol].institution_value = holdingMap[
        ticker_symbol
      ].institution_value = new Decimal(
        holdingMap[ticker_symbol].institution_value
      ).plus(new Decimal(institutional_value || 0));
    }
  }

  // Step 2: Calculate future value for each unique security
  const res = [];

  for (const security_id in holdingMap) {
    const {
      name,
      quantity,
      total,
      annual_return_rate,
      subtype,
      account_id,
      institution_value,
    } = holdingMap[security_id];

    // Calculate future value based on total quantity and close price
    let fv;
    if (with_inflation) {
      fv = future_value_with_inflation_fn_v2(
        institution_value,
        annual_return_rate,
        annual_inflation_rate,
        end_year - start_year
      );
    } else {
      fv = future_value_fn_v2(
        institution_value,
        annual_return_rate,
        end_year - start_year
      );
    }

    res.push({
      name,
      annual_growth_rate: new Decimal(annual_return_rate).toDecimalPlaces(2),
      projection: new Decimal(fv).toDecimalPlaces(2),
      security_id,
      account_id,
      type,
      subtype,
      total: total.toDecimalPlaces(2),
      shares: quantity.toDecimalPlaces(2),
    });
  }

  return res;
};
