import { Account } from "@/types/plaid";
import { FinancialAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import {
  getHoldingNameV2,
  getTotal,
} from "@/utils/api-helpers/holdingAccessors";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";

import {
  future_value_with_inflation_fn,
  future_value_fn,
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
      sub_type: "cash",
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
  const res = [];
  for (const account of accounts) {
    const holdings = account.holdings ?? [];

    for (const holding of holdings) {
      const { quantity, close_price, annual_return_rate } =
        getFormulaValues(holding);

      let fv;
      if (with_inflation) {
        fv = future_value_with_inflation_fn(
          quantity,
          close_price,
          annual_return_rate,
          annual_inflation_rate,
          end_year - start_year
        );
      } else {
        fv = future_value_fn(
          quantity,
          close_price,
          annual_return_rate,
          end_year - start_year
        );
      }

      res.push({
        name: getHoldingNameV2(holding, account.name),
        annual_growth_rate: new Decimal(annual_return_rate).toDecimalPlaces(2),
        projection: new Decimal(fv).toDecimalPlaces(2),
        security_id: holding.security_id,
        account_id: holding.account_id,
        type: type,
        sub_type: holding?.security?.type,
        total: getTotal(holding),
        shares: new Decimal(holding.quantity || 0),
      });
    }
  }
  return res;
};
