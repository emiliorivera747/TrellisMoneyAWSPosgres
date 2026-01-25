import { ColorConfig } from "./colors";

/**
 * Represents the data structure for time series data used in graphs.
 * @export
 * @interface TimeSeriesData
 */
export interface TimeSeriesData {
  /**
   * The date associated with the data point.
   * @type {Date}
   * @memberof TimeSeriesData
   */
  date: Date;

  /**
   * The closing value of the data point.
   * @type {number}
   * @memberof TimeSeriesData
   */
  close: number;
}

/**
 * Represents security data with date and close price.
 * @export
 * @interface SecurityData
 */
export interface SecurityData {
  /**
   * The date of the data point.
   * @type {Date}
   * @memberof SecurityData
   */
  date: Date;
  /**
   * The close price.
   * @type {number}
   * @memberof SecurityData
   */
  close: number;
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
