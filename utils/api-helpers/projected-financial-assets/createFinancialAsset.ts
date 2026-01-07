import Decimal from "decimal.js";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { Assets } from "@/types/assets";

interface ConstructAssetParams {
  name: string;
  expected_expected_annual_return_rate: number | Decimal;
  projection: number;
  security_id: string | undefined;
  account_id: string;
  type: AccountType;
  subtype: string;
  total: number | Decimal;
  shares: Decimal;
  accounts: string[];
}

/**
 * Factory function to create FinancialAssets objects
 *
 * @param param0
 * @returns
 */
export const constructAsset = ({
  name,
  expected_expected_annual_return_rate,
  projection,
  security_id,
  account_id,
  type,
  subtype,
  total,
  shares,
  accounts,
}: ConstructAssetParams): Assets => ({
  name,
  expected_expected_annual_return_rate: new Decimal(expected_expected_annual_return_rate).toDecimalPlaces(2),
  projection: new Decimal(projection).toDecimalPlaces(2),
  security_id,
  account_id,
  type,
  subtype,
  total: new Decimal(total).toDecimalPlaces(2),
  shares,
  accounts,
});
