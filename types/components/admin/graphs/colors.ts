export interface TrendColors {
  /**
   * The color for upward trend.
   * @type {string}
   * @memberof LineColor
   */
  upColor: string;
  /**
   * The color for downward trend.
   * @type {string}
   * @memberof LineColor
   */
  downColor: string;
  /**
   * The color for flat/neutral trend.
   * @type {string}
   * @memberof LineColor
   */
  flatColor: string;
}

/**
 * Represents the color configuration for graph elements.
 * @export
 * @interface ColorConfig
 */
export interface ColorConfig {
  /**
   * The color of the line.
   * @type {LineColor}
   * @memberof ColorConfig
   */
  lineColor: TrendColors;

  /**
   * The color of the tag text.
   * @type {TagTextColor}
   * @memberof ColorConfig
   */
  tagTextColor: TrendColors;

  /**
   * The color of the tag background.
   * @type {tagBgColor}
   * @memberof ColorConfig
   */
  tagBgColor: TrendColors;

  /**
   * The color of the subheader.
   * @type {subheaderColor}
   * @memberof ColorConfig
   */
  subheaderColor: TrendColors;
}
