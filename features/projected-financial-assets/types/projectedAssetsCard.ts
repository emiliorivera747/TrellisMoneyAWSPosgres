import {
  UseFormReturn,
  UseFormRegister,
  Path,
  FieldValues,
  FieldErrors,
} from "react-hook-form";

import { AssetsWithType } from "@/types/assets";

export type AccountType =
  | "depository"
  | "investment"
  | "credit"
  | "loan"
  | "Other";

export interface Assets {
  name: string;
  annual_growth_rate: number;
  shares?: number;
  amount?: number;
  security_id?: string;
  account_id?: string;
  projection: number;
  type: AccountType;
}

export interface ProjectedAssetsCardProps<TFieldValues extends FieldValues> {
  assets: Assets[];
  selectedYear: number;
  form: UseFormReturn<FieldValues, any, undefined>;
  isLoading: boolean;
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
}

export interface AssetGroupProps {
  assetType: string;
  assets: Assets[]; 
  form: any; 
}

export interface ProjectionCellProps {
  value: number;
}

export interface GrowthRateCellProps {
  asset: Assets;
  form: any;
}
