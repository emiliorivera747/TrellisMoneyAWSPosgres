import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import { Decimal } from "decimal.js";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";
import { AssetType } from "plaid";
import { FutureProjectionData } from "@/types/futureProjections";

export type ProjectedAssetCardMode = "edit" | "view";

export interface ProjectedAssetCardProps<TFieldValues extends FieldValues> {
  ProjectedAsset: ProjectedAsset[] ;
  selectedYear: number;
  form: any;
  isLoading: boolean;
  mode: ProjectedAssetCardMode;
  handleModeChange: () => void;
}

export interface ProjecteAssetsContainerProps {
  assets: ProjectedAsset[] | undefined;
  children: React.ReactNode;
}

export interface ProjectedAssetName {
  name: string;
}

export interface ProjectedAssetRowProps {
  asset: ProjectedAsset;
  form: any;
  mode: ProjectedAssetCardMode;
}

export interface ProjectedAssetGroupProps {
  assetType: AssetType;
  assets: ProjectedAsset[];
  form: any;
  mode: ProjectedAssetCardMode;
}

export interface ProjectionCellProps {
  value: number;
}

export interface GrowthRateCellPropsInput {
  asset: ProjectedAsset;
  form: any;
}

export interface GrowthRateCellPropsText {
  asset: ProjectedAsset;
}

export interface GroupedHolding {
  security_id: string;
  name: string;
  quantity: Decimal;
  institution_value: Decimal;
  expected_annual_return_rate: number;
  subtype: string;
  account_id: string;
  accounts: (string | undefined)[];
}

export interface ProjectedAssetCardFormProps {
  futureProjectionData: FutureProjectionData | undefined | Error;
  selectedInflationFilter: InflationFilters;
}

export interface AssetsGridLayoutProps {
  mode: ProjectedAssetCardMode;
  children: ReactNode;
}
