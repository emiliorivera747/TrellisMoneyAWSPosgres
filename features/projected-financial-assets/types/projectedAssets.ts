import { Assets } from "@/types/assets";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import Decimal from "decimal.js";

export interface ProjectedAssets {
  data: Assets[];
  value: string;
}

export interface ProjectedNetworth {
  data: NetWorthData[];
  value: string;
}

export interface NetWorthData {
  date: Date;
  close: number;
}

export interface ProjectionData {
  projected_assets: ProjectedAssets[];
  projected_net_worth: ProjectedNetworth[];
}

export interface FinancialAssets {
  name: string;
  annual_growth_rate: number | null | Decimal;
  projection: number | null | Decimal;
  security_id: string | undefined | null;
  account_id: string | undefined;
  type: AccountType;
  subtype?: string;
  total?: number | null | Decimal;
  shares: number | null | Decimal;
  user_id?: string | undefined;
}

export interface ProjectionConfig {
  years: number;
  with_inflation: boolean;
  annual_inflation_rate: number;
  type: AccountType;
}

// Parameters for generating financial assets
export interface ProjectionParams {
  start_year: number;
  end_year: number;
  with_inflation?: boolean;
  annual_inflation_rate: number;
  accounts?: Account[];
}
