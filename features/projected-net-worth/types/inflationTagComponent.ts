import { LineSeriesConfig } from "@/types/components/admin/graphs/data";

/**
 * Represents the category of inflation direction.
 * @export
 * @typedef {"up" | "down" | "flat"} InflationCategory
 */
export type InflationCategory = "up" | "down" | "flat";

/**
 * Properties for the inflation tag component.
 * @export
 * @interface InflationTagProps
 */
export interface InflationTagProps {
  /**
   * The category of inflation (up, down, or flat).
   * @type {InflationCategory}
   * @memberof InflationTagProps
   */
  inflation_category?: InflationCategory;

  /**
   * Background color for the tag.
   * @type {string}
   * @memberof InflationTagProps
   */
  bg_color?: string;

  /**
   * Text color for the tag.
   * @type {string}
   * @memberof InflationTagProps
   */
  text_color?: string;

  /**
   * SVG icon color for the tag.
   * @type {string}
   * @memberof InflationTagProps
   */
  svg_color?: string;

  /**
   * Line configuration data for the graph line associated with this tag.
   * @type {LineSeriesConfig}
   * @memberof InflationTagProps
   */
  linePayload: LineSeriesConfig;
}
