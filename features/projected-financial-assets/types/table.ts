import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";
import { ProjectedAssetCardMode } from "@/features/projected-financial-assets/types/projectedAssetsCard";

/**
 * Properties for the table body component that displays projected assets.
 * @export
 * @interface TableBodyForAssetsProps
 */
export interface TableBodyForAssetsProps {
  /**
   * Array of projected assets to display in the table.
   * @type {ProjectedAsset[]}
   * @memberof TableBodyForAssetsProps
   */
  assets: ProjectedAsset[];

  /**
   * Form instance for handling asset data.
   * @type {any}
   * @memberof TableBodyForAssetsProps
   */
  form: any;

  /**
   * Display mode for the projected asset card.
   * @type {ProjectedAssetCardMode}
   * @memberof TableBodyForAssetsProps
   */
  mode: ProjectedAssetCardMode;
}

/**
 * Properties for the assets table component.
 * @export
 * @interface AssetsTableProps
 */
export interface AssetsTableProps {
  /**
   * Array of projected assets to display in the table.
   * @type {ProjectedAsset[]}
   * @memberof AssetsTableProps
   */
  assets: ProjectedAsset[];

  /**
   * Form instance for handling asset data.
   * @type {any}
   * @memberof AssetsTableProps
   */
  form: any;

  /**
   * Display mode for the projected asset card.
   * @type {ProjectedAssetCardMode}
   * @memberof AssetsTableProps
   */
  mode: ProjectedAssetCardMode;
}
