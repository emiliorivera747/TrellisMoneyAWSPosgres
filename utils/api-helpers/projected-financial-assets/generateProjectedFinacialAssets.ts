import { Holding } from "@/types/plaid";

import { getHoldingName } from "@/utils/api-helpers/holdingAccessors";

import {
  future_value_with_inflation_fn,
  future_value_fn,
  getFormulaValues,
} from "@/utils/api-helpers/futureValueFormulas";
import Decimal from "decimal.js";

interface financialAssests {
    asset_name: string;
    annual_growth_rate: Decimal;
    projection: Decimal;
    security_id: string | undefined;
    account_id: string | undefined;
}

export const generateProjectedFinancialAssets = async (
    start_year: number,
    end_year: number,
    with_inflation: boolean = false,
    annual_inflation_rate: number,
    holdings: Holding[]
): Promise<financialAssests[] | []> => {
    // Early return for empty holdings or invalid dates
    if (!holdings.length || end_year < start_year) return [];

    let assets: financialAssests[] = [];

    // Loop through the holdings and calculate the projected net worth for the end year
    for (const holding of holdings) {
        const { quantity, close_price, annual_return_rate } = getFormulaValues(holding);

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
            fv = future_value_fn(quantity, close_price, annual_return_rate, end_year - start_year);
        }

        assets.push({
            asset_name: getHoldingName(holding),
            annual_growth_rate: new Decimal(annual_return_rate),
            projection: new Decimal(fv),
            security_id: holding.security_id,
            account_id: holding.account_id,
        });
    }

    return assets;
};

