/**
 * Represents projection data containing net worth and asset projections.
 * @export
 * @interface ProjectionData
 */
export interface ProjectionData {
  /**
   * Array of projected net worth data points.
   * @type {{ value: string; data: any; }[]}
   * @memberof ProjectionData
   */
  projected_net_worth: { value: string; data: any; }[];

  /**
   * Array of projected asset data points.
   * @type {{ value: string; data: any; }[]}
   * @memberof ProjectionData
   */
  projected_assets: { value: string; data: any; }[];
} 