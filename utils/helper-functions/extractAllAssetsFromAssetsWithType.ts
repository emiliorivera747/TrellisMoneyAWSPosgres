import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

export interface AssetsWithType {
  assets: ProjectedAsset[];
  type?: string;
}

export const extractAllAssetsFromAssetWithType = (
  assetWithType: AssetsWithType[]
): ProjectedAsset[] => {
  const res = assetWithType.flatMap((item) => item.assets);
  return res;
};
