import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { TimeSeriesData, LineSeriesConfig } from "./data";

/**
 * Represents the properties for a tooltip component in a graph.
 * @export
 * @interface TooltipProps
 */
export interface TooltipProps {
  /**
   * The horizontal position of the tooltip, in pixels.
   * @type {number}
   * @memberof TooltipProps
   */
  tooltipLeft: number;

  /**
   * The vertical position of the tooltip, in pixels (optional).
   * @type {number}
   * @memberof TooltipProps
   */
  tooltipTop?: number;

  /**
   * The margin object defining the spacing around the graph.
   * - `top`: The top margin, in pixels.
   * - `right`: The right margin, in pixels.
   * - `bottom`: The bottom margin, in pixels.
   * - `left`: The left margin, in pixels.
   * @type {{ top: number; right: number; bottom: number; left: number }}
   * @memberof TooltipProps
   */
  margin: { top: number; right: number; bottom: number; left: number };

  /**
   * The inner height of the graph, in pixels.
   * @type {number}
   * @memberof TooltipProps
   */
  innerHeight: number;

  /**
   * A function that maps a stock value to a scaled value for positioning.
   * @type {(arg: number) => number}
   * @memberof TooltipProps
   */
  stockValueScale: (arg: number) => number;

  /**
   * The data to be displayed in the tooltip, represented as an array of payloads.
   * @type {TooltipPayload[]}
   * @memberof TooltipProps
   */
  tooltipData: TooltipPayload[];

  /**
   * The possible directions for the tooltip to be displayed.
   * @type {Direction[]}
   * @memberof TooltipProps
   */
  directions: Direction[];
}

/**
 * Represents the payload data for a tooltip in a graph.
 * @export
 * @interface TooltipPayload
 */
export interface TooltipPayload {
  /**
   * The time series data associated with the tooltip.
   * @type {TimeSeriesData}
   * @memberof TooltipPayload
   */
  d: TimeSeriesData;

  /**
   * The color associated with the tooltip's data point or line.
   * @type {string}
   * @memberof TooltipPayload
   */
  color: string;

  /**
   * The stroke width of the line associated with the tooltip's data point.
   * @type {number}
   * @memberof TooltipPayload
   */
  strokeWidth: number;

  /**
   * The array of time series data points related to the tooltip.
   * @type {TimeSeriesData[]}
   * @memberof TooltipPayload
   */
  data: TimeSeriesData[];

  /**
   * The payload data for the line associated with the tooltip.
   * @type {LineSeriesConfig}
   * @memberof TooltipPayload
   */
  linePayload: LineSeriesConfig;
}

/**
 * Represents the properties for a line graph tooltip component.
 * @export
 * @interface LineGraphTooltipProps
 */
export interface LineGraphTooltipProps {
  /**
   * The margin object defining the spacing around the graph (optional).
   * - `top`: The top margin, in pixels.
   * @type {{ top: number }}
   * @memberof LineGraphTooltipProps
   */
  margin?: { top: number };

  /**
   * The horizontal position of the tooltip, in pixels.
   * @type {number}
   * @memberof LineGraphTooltipProps
   */
  tooltipLeft: number;

  /**
   * The default styles applied to the tooltip.
   * @type {React.CSSProperties}
   * @memberof LineGraphTooltipProps
   */
  defaultStyles: React.CSSProperties;

  /**
   * The data to be displayed in the tooltip.
   * @type {any}
   * @memberof LineGraphTooltipProps
   */
  tooltipData: any;
}
