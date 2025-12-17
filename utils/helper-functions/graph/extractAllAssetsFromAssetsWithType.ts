import { AssetsWithType, Assets } from "@/types/assets";

export const extractAllAssetsFromAssetWithType = (
  assetWithType: AssetsWithType[]
): Assets[] => {
  const res = assetWithType.flatMap((item) => item.assets);
  return res;
};
