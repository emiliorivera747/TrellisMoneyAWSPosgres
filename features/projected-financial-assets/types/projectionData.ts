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
  projectedNetWorth: { value: string; data: any; }[];

  /**
   * Array of projected asset data points.
   * @type {{ value: string; data: any; }[]}
   * @memberof ProjectionData
   */
  projectedAssets: { value: string; data: any; }[];
} 