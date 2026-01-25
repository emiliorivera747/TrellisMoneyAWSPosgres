/**
 * Represents the category of inflation performance.
 * @export
 * @typedef {"Beats Inflation" | "Breaks Even With Inflation" | "Falling Behind Inflation"} InflationCategory
 */
export type InflationCategory =
  | "Beats Inflation"
  | "Breaks Even With Inflation"
  | "Falling Behind Inflation";

/**
 * Properties for the inflation tag component.
 * @export
 * @interface InflationTagProps
 */
export interface InflationTagProps {
  /**
   * The category of inflation performance.
   * @type {InflationCategory}
   * @memberof InflationTagProps
   */
  inflation_category: InflationCategory;

  /**
   * Background color for the tag.
   * @type {string}
   * @memberof InflationTagProps
   */
  bg_color: string;

  /**
   * Text color for the tag.
   * @type {string}
   * @memberof InflationTagProps
   */
  text_color: string;

  /**
   * SVG icon color for the tag.
   * @type {string}
   * @memberof InflationTagProps
   */
  svg_color: string;
}
