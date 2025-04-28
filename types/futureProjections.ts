import {Assets} from '@/types/assets';
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
  data: Assets[];
  value: string;
}

export interface ProjectedNetworth {
  data: NetWorthData[];
  value: string;
}
