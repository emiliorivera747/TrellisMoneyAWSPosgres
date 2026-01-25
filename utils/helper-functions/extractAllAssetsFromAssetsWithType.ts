import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

/**
 * Represents a collection of assets with an optional type classification.
 * @export
 * @interface AssetsWithType
 */
export interface AssetsWithType {
  /**
   * Array of projected assets.
   * @type {ProjectedAsset[]}
   * @memberof AssetsWithType
   */
  assets: ProjectedAsset[];

  /**
   * Optional type classification for the assets.
   * @type {string}
   * @memberof AssetsWithType
   */
  type?: string;
}

export const extractAllAssetsFromAssetWithType = (
  assetWithType: AssetsWithType[]
): ProjectedAsset[] => {
  const res = assetWithType.flatMap((item) => item.assets);
  return res;
};
