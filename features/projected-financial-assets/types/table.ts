import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { AssetsWithType } from "@/types/assets";
export interface TableBodyForAssetsProps {
  assets: Assets[];
  form: any;
  mode: "edit" | "view";
}

export interface AssetsTableProps{
  assets: Assets[];
  form: any;
  mode: "edit" | "view";
}
