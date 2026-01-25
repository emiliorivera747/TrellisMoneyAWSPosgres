import { ColorConfig } from "./colors";

/**
 * Represents a data point in a time series for financial metrics.
 * @export
 * @interface TimeSeriesData
 */
export interface TimeSeriesData {
  /**
   * The date/time of the data point.
   * @type {Date}
   * @memberof TimeSeriesData
   */
  date: Date;

  /**
   * The financial value at this point in time (e.g., net worth, account balance, stock price).
   * @type {number}
   * @memberof TimeSeriesData
   */
  value: number;
}

/**
 * Represents the configuration data for a line series in a graph.
 * @export
 * @interface LineSeriesConfig
 */
export interface LineSeriesConfig {
  /**
   * The data of Line to be rendered.
   * @type {TimeSeriesData[]}
   * @memberof LineSeriesConfig
   */
  data: TimeSeriesData[];

  /**
   * The color configuration of the line.
   * @type {ColorConfig}
   * @memberof LineSeriesConfig
   */
  colorConfig?: ColorConfig;

  /**
   * The stroke width of the line.
   * @type {number}
   * @memberof LineSeriesConfig
   */
  strokeWidth?: number;

  /**
   * The filter value to be applied to the line.
   * @type {string}
   * @memberof LineSeriesConfig
   */
  filterValue?: string;
}
