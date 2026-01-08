import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { ProjectedAssetCardMode } from "@/features/projected-financial-assets/types/projectedAssetsCard";

export interface TableBodyForAssetsProps {
  assets: Assets[];
  form: any;
  mode: ProjectedAssetCardMode;
}

export interface AssetsTableProps {
  assets: Assets[];
  form: any;
  mode: ProjectedAssetCardMode;
}
