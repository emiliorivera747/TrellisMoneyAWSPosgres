import Decimal from "decimal.js";
import { FinancialAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";


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


/**
 * Factory function to create FinancialAssets objects
 * 
 * @param param0 
 * @returns 
 */
export const createFinancialAsset = ({
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
