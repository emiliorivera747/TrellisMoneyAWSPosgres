import { NetWorthData } from "@/features/projected-net-worth/types/projectedNetWorth";
import { ProjectedAsset} from "@/features/projected-financial-assets/types/projectedAssets";

/**
 *  Future projection data consits of the projected assets and net worth
 */
export interface FutureProjectionData {
 
  /**
   * The projected assets
   */
  projected_assets: ProjectedAssetsWithFilter[];

  /**
   * The projected net worth
   */
  projected_net_worth: ProjectedNetWorthWithFilter[];
}

/**
 * Projected assets data
 */
export interface ProjectedAssetsWithFilter {
  
  /**
   * The projected assets data
   */
  data: ProjectedAsset[];
  
  /**
   * The filtered value of the projected assets
   */
  value: string;
}

export interface ProjectedNetWorthWithFilter {
  /**
   * The projected net worth data
   */
  data: NetWorthData[];
  /**
   * The filtered value of the projected net worth
   */
  value: string;
}
