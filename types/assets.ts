import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import Decimal from "decimal.js";

export interface Assets {
  name: string;
  annual_return_rate: number | Decimal;
  projection: number | Decimal;
  security_id: string | undefined;
  account_id: string | undefined;
  type: AccountType;
  shares: number | Decimal;
  user_id?: string | undefined;
  subtype: string;
  total: number | Decimal
  accounts: string[];
}

export interface AssetsWithType {
  type: AccountType;
  assets: Assets[];
}
