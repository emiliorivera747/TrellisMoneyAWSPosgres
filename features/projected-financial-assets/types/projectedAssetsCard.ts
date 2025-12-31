import { FieldValues } from "react-hook-form";
import { Decimal } from "decimal.js";

export type AssetCardMode = "edit" | "view";

export type AccountType =
  | "depository"
  | "investment"
  | "credit"
  | "loan"
  | "Other";

export type SecurityType =
  | "cash"
  | "cryptocurrency"
  | "derivative"
  | "equity"
  | "etf"
  | "fixed income"
  | "loan"
  | "mutual fund"
  | "other";
export interface Assets {
  name: string;
  annual_growth_rate?: number | null;
  shares?: number;
  amount?: number;
  security_id?: string;
  account_id?: string;
  projection: number;
  type: AccountType;
  total: number | null;
  subtype: string;
}

export interface ProjectedAssetsCardProps<TFieldValues extends FieldValues> {
  assets: Assets[];
  selectedYear: number;
  form: any;
  isLoading: boolean;
  mode: AssetCardMode;
  handleModeChange: () => void;
}

export interface ProjectedAssetsContainerProps {
  assets: Assets[];
  children: React.ReactNode;
}

export interface AssetName {
  name: string;
}

export interface AssetRowProps {
  asset: Assets;
  form: any;
  mode: AssetCardMode;
}

export interface AssetGroupProps {
  assetType: string;
  assets: Assets[];
  form: any;
  mode: AssetCardMode;
}

export interface ProjectionCellProps {
  value: number;
}

export interface GrowthRateCellPropsInput {
  asset: Assets;
  form: any;
}

export interface GrowthRateCellPropsText {
  asset: Assets;
}

export interface HoldingAggregate {
  security_id: string;
  name: string;
  quantity: Decimal;
  institution_value: Decimal;
  annual_return_rate: number;
  subtype: string;
  account_id: string;
}

export interface FutureValueParams {
  value: number | Decimal;
  annual_return_rate: number | Decimal;
  annual_inflation_rate: number | Decimal;
  years: number;
  with_inflation: boolean;
}
