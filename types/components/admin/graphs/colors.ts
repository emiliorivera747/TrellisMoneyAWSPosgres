/**
 * Represents line colors for different states.
 * @export
 * @interface LineColor
 */
export interface LineColor {
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
 * Represents tag text colors for different states.
 * @export
 * @interface tagTextColor
 */
export interface tagTextColor {
  /**
   * The color for upward trend.
   * @type {string}
   * @memberof tagTextColor
   */
  upColor: string;
  /**
   * The color for downward trend.
   * @type {string}
   * @memberof tagTextColor
   */
  downColor: string;
  /**
   * The color for flat/neutral trend.
   * @type {string}
   * @memberof tagTextColor
   */
  flatColor: string;
}

/**
 * Represents tag background colors for different states.
 * @export
 * @interface tagBgColor
 */
export interface tagBgColor {
  /**
   * The color for upward trend.
   * @type {string}
   * @memberof tagBgColor
   */
  upColor: string;
  /**
   * The color for downward trend.
   * @type {string}
   * @memberof tagBgColor
   */
  downColor: string;
  /**
   * The color for flat/neutral trend.
   * @type {string}
   * @memberof tagBgColor
   */
  flatColor: string;
}

/**
 * Represents the color configuration for a subheader in a graph.
 * @export
 * @interface subheaderColor
 */
export interface subheaderColor {
  /**
   * The color used to indicate an upward trend or positive change.
   * @type {string}
   * @memberof subheaderColor
   */
  upColor: string;

  /**
   * The color used to indicate a downward trend or negative change.
   * @type {string}
   * @memberof subheaderColor
   */
  downColor: string;

  /**
   * The color used to indicate a flat or neutral trend.
   * @type {string}
   * @memberof subheaderColor
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
  lineColor: LineColor;

  /**
   * The color of the tag text.
   * @type {tagTextColor}
   * @memberof ColorConfig
   */
  tagTextColor: tagTextColor;

  /**
   * The color of the tag background.
   * @type {tagBgColor}
   * @memberof ColorConfig
   */
  tagBgColor: tagBgColor;

  /**
   * The color of the subheader.
   * @type {subheaderColor}
   * @memberof ColorConfig
   */
  subheaderColor: subheaderColor;
}
