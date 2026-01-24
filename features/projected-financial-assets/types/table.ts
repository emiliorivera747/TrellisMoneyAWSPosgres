import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";
import { ProjectedAssetCardMode } from "@/features/projected-financial-assets/types/projectedAssetsCard";

export interface TableBodyForAssetsProps {
  assets: ProjectedAsset[];
  form: any;
  mode: ProjectedAssetCardMode;
}

export interface AssetsTableProps {
  assets: ProjectedAsset[];
  form: any;
  mode: ProjectedAssetCardMode;
}
