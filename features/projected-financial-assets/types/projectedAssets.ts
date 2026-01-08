import { Account } from "@/types/plaid";
import { AccountType } from "plaid";
import { Decimal } from "decimal.js";

export interface ProjectedAsset {
  name: string;
  expected_annual_return_rate: number | null;
  projection: number | null;
  security_id: string | undefined | null;
  account_id: string | undefined;
  type: AccountType;
  subtype?: string;
  total?: number | null;
  shares: number | null;
  user_id?: string | undefined;
}
export interface ProjectedAssetWithDecimal {
  name: string;
  expected_annual_return_rate: number | Decimal | null;
  projection: number | Decimal | null;
  security_id: string | undefined | null;
  account_id: string | undefined;
  type: AccountType;
  subtype?: string;
  total?: number | Decimal | null;
  shares: number | Decimal | null;
  user_id?: string | undefined;
  accounts?:  (string | undefined)[];
}

export interface ProjectedAssetProjectionConfig {
  years: number;
  includes_inflation: boolean;
  annual_inflation_rate: number;
  type: AccountType;
}

export interface ProjectionParams {
  start_year: number;
  end_year: number;
  includes_inflation?: boolean;
  annual_inflation_rate: number;
  accounts?: Account[];
}
