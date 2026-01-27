import { NetWorthData } from "@/features/projected-net-worth/types/projectedNetWorth";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

export type InflationFilters = "inflationAdjusted" | "actual" | "both";

/**
 * Future projection data consists of the projected assets and net worth.
 * @export
 * @interface FutureProjectionData
 */
export interface FutureProjectionData {
  /**
   * The projected assets.
   * @type {ProjectedAssetsWithFilter[]}
   * @memberof FutureProjectionData
   */
  projectedAssets: ProjectedAssetsWithFilter[];

  /**
   * The projected net worth.
   * @type {ProjectedNetWorthWithFilter[]}
   * @memberof FutureProjectionData
   */
  projectedNetWorth: ProjectedNetWorthWithFilter[];
}

/**
 * Projected assets data with filter.
 * @export
 * @interface ProjectedAssetsWithFilter
 */
export interface ProjectedAssetsWithFilter {
  /**
   * The projected assets data.
   * @type {ProjectedAsset[]}
   * @memberof ProjectedAssetsWithFilter
   */
  data: ProjectedAsset[];

  /**
   * The filtered value of the projected assets.
   * @type {string}
   * @memberof ProjectedAssetsWithFilter
   */
  filterValue: InflationFilter;
}

/**
 * Projected net worth data with filter.
 * @export
 * @interface ProjectedNetWorthWithFilter
 */
export interface ProjectedNetWorthWithFilter {
  /**
   * The projected net worth data.
   * @type {NetWorthData[]}
   * @memberof ProjectedNetWorthWithFilter
   */
  data: NetWorthData[];
  /**
   * The filtered value of the projected net worth.
   * @type {string}
   * @memberof ProjectedNetWorthWithFilter
   */
  filterValue: InflationFilter;
}
