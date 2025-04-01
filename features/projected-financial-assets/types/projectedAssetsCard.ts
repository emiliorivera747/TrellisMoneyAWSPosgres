import {
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

import { FinancialAssets } from "@/features/projected-financial-assets/types/financialAssets";

export type AccountType =
  | "depository"
  | "investment"
  | "credit"
  | "loan"
  | "Other";

export interface Assets {
  name: string;
  annual_growth_rate?: number | null;
  shares?: number;
  amount?: number;
  security_id?: string;
  account_id?: string;
  projection: number;
  type: AccountType;
}

export interface ProjectedAssetsCardProps<TFieldValues extends FieldValues> {
  assets: FinancialAssets[];
  selectedYear: number;
  form :any; 
  isLoading: boolean;
  mode: "edit" | "view";
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
  mode: "edit" | "view";
}

export interface AssetGroupProps {
  assetType: string;
  assets: Assets[]; 
  form: any; 
  mode: "edit" | "view";
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

