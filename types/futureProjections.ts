import { Assets } from "@/types/assets";
import { NetWorthData } from "@/features/projected-financial-assets/types/projectedAssets";

/**
 *  Future projection data consits of the projected assets and net worth
 */
export interface FutureProjectionData {
  /**
   * The projected assets
   */
  projected_assets: ProjectedAssets[];

  /**
   * The projected net worth
   */
  projected_net_worth: ProjectedNetworth[];
}

/**
 * Projected assets data
 */
export interface ProjectedAssets {
  /**
   * The projected assets data
   */
  data: Assets[];
  /**
   * The filtered value of the projected assets
   */
  value: string;
}

export interface ProjectedNetworth {
  /**
   * The projected net worth data
   */
  data: NetWorthData[];
  /**
   * The filtered value of the projected net worth
   */
  value: string;
}
