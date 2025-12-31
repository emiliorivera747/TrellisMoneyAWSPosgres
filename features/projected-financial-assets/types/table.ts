import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { AssetCardMode } from "@/features/projected-financial-assets/types/projectedAssetsCard";

export interface TableBodyForAssetsProps {
  assets: Assets[];
  form: any;
  mode: AssetCardMode;
}

export interface AssetsTableProps {
  assets: Assets[];
  form: any;
  mode: AssetCardMode;
}
