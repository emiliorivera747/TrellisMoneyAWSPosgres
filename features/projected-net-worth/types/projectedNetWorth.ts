/**
 * Represents a single data point in the net worth time series.
 * @export
 * @interface NetWorthData
 */
export interface NetWorthData {
  /**
   * The date of this net worth data point.
   * @type {Date}
   * @memberof NetWorthData
   */
  date: Date;

  /**
   * The net worth value at this date.
   * @type {number}
   * @memberof NetWorthData
   */
  value: number;
}

/**
 * Represents projected net worth data with a collection of time series data points.
 * @export
 * @interface ProjectedNetworth
 */
export interface ProjectedNetworth {
  /**
   * Array of net worth data points over time.
   * @type {NetWorthData[]}
   * @memberof ProjectedNetworth
   */
  data: NetWorthData[];

  /**
   * String representation or label for the projected net worth.
   * @type {string}
   * @memberof ProjectedNetworth
   */
  value: string;
}
