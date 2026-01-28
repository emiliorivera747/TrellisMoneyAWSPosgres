import { LineSeriesConfig } from "./data";
import { TooltipConfig } from "./tooltips";

/**
 * Represents a unified configuration that pairs a line series with its optional tooltip state.
 * This eliminates the need for parallel arrays correlated by index.
 * @export
 * @interface GraphConfig
 */
export interface GraphConfig {
  /**
   * The line series configuration containing data and styling.
   * @type {LineSeriesConfig}
   * @memberof GraphConfig
   */
  lineConfig: LineSeriesConfig;

  /**
   * The tooltip configuration for this line, present when the user is hovering.
   * @type {TooltipConfig}
   * @memberof GraphConfig
   */
  tooltipConfig?: TooltipConfig;
}

/**
 * Creates an array of GraphConfig by pairing lineConfigs with their corresponding tooltipConfigs.
 * @param lineConfigs - Array of line series configurations
 * @param tooltipConfigs - Optional array of tooltip configurations (same length as lineConfigs when present)
 * @returns Array of unified GraphConfig objects
 */
export function createGraphConfigs(
  lineConfigs: LineSeriesConfig[],
  tooltipConfigs?: TooltipConfig[]
): GraphConfig[] {
  return lineConfigs.map((lineConfig, index) => ({
    lineConfig,
    tooltipConfig: tooltipConfigs?.[index],
  }));
}
