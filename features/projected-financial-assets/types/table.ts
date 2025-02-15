import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { AssetsWithType } from "@/types/assets";
export interface TableBodyForAssetsProps {
  assets: AssetsWithType[];
  form: any;
}

export interface AssetsTableProps{
  assets: AssetsWithType[];
  form: any;
}
