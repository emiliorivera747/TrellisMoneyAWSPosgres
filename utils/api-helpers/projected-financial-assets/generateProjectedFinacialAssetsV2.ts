import { Holding, Account } from "@/types/plaid";

import { getHoldingName } from "@/utils/api-helpers/holdingAccessors";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";

import {
  future_value_with_inflation_fn,
  future_value_fn,
  getFormulaValues,
} from "@/utils/api-helpers/futureValueFormulas";
import Decimal from "decimal.js";

interface financialAssests {
  name: string;
  annual_growth_rate: Decimal;
  projection: Decimal;
  security_id: string | undefined;
  account_id: string | undefined;
  type: AccountType;
  shares: Decimal;
}



interface GroupedAssets {
  type: AccountType;
  assets: financialAssests[];
}

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
): Promise<GroupedAssets[] | []> => {

  console.log("accounts", accounts);

  return [{ type: "Investment", assets: []}];
};
