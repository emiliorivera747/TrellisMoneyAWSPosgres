import { LineSeriesConfig, TimeSeriesData } from "@/types/components/admin/graphs/data";
import { GraphConfig } from "@/types/components/admin/graphs/graph-config";
import { FutureProjectionData } from "@/types/future-projections/futureProjections";

/**
 * Represents projected net worth data with time series and a value label.
 * @export
 * @typedef {Object} ProjectedNetWorth
 */
export type ProjectedNetWorth = {
  /**
   * String label or identifier for the projected net worth.
   * @type {String}
   * @memberof ProjectedNetWorth
   */
  filterValue: String;

  /**
   * Array of time series data points for the projection.
   * @type {TimeSeriesData[]}
   * @memberof ProjectedNetWorth
   */
  data: TimeSeriesData[];
};
/**
 * Properties for a double line graph component.
 * @export
 * @interface DoubleLineGraphProps
 */
export interface DoubleLineGraphProps {
  /**
   * Width of the graph in pixels.
   * @type {number}
   * @memberof DoubleLineGraphProps
   */
  width: number;

  /**
   * The currently selected year for the graph display.
   * @type {number}
   * @memberof DoubleLineGraphProps
   */
  selectedYear: number;

  /**
   * Height of the graph in pixels.
   * @type {number}
   * @memberof DoubleLineGraphProps
   */
  height: number;

  /**
   * Time series data for the first line.
   * @type {TimeSeriesData[]}
   * @memberof DoubleLineGraphProps
   */
  data1: TimeSeriesData[];

  /**
   * Time series data for the second line.
   * @type {TimeSeriesData[]}
   * @memberof DoubleLineGraphProps
   */
  data2: TimeSeriesData[];

  /**
   * Optional margin configuration for the graph.
   * @type {{ top: number; right: number; bottom: number; left: number }}
   * @memberof DoubleLineGraphProps
   */
  margin?: { top: number; right: number; bottom: number; left: number };
}

/**
 * Properties for the date axis tooltip component.
 * @export
 * @interface DateAxisTooltipProps
 */
export interface DateAxisTooltipProps {
  /**
   * Top margin for the tooltip.
   * @type {{ top: number }}
   * @memberof LineGraphTooltipProps
   */
  margin: { top: number };

  /**
   * Left position of the tooltip in pixels.
   * @type {number}
   * @memberof LineGraphTooltipProps
   */
  tooltipLeft: number;

  /**
   * Default CSS styles for the tooltip.
   * @type {React.CSSProperties}
   * @memberof LineGraphTooltipProps
   */
  defaultStyles: React.CSSProperties;

  /**
   * Data to be displayed in the tooltip.
   * @type {any}
   * @memberof LineGraphTooltipProps
   */
  tooltipConfigs: any;
}

/**
 * Properties for a header component with an icon and action.
 * @export
 * @interface HeaderWithIconProps
 */
export interface HeaderWithIconProps {
  /**
   * Function to execute when the header action is triggered.
   * @type {() => void}
   * @memberof HeaderWithIconProps
   */
  actionFunction: () => void;

  /**
   * Label text to display in the header.
   * @type {string}
   * @memberof HeaderWithIconProps
   */
  label: string;

  /**
   * Icon element to display in the header.
   * @type {React.ReactNode}
   * @memberof HeaderWithIconProps
   */
  icon: React.ReactNode;

  /**
   * Label text for the tooltip.
   * @type {string}
   * @memberof HeaderWithIconProps
   */
  toolTipLabel: string;
}

/**
 * Properties for a responsive line graph component.
 * @export
 * @interface ResponsiveLineGraphProps
 */
export interface ResponsiveLineGraphProps<T> {
  /**
   * The currently selected year for the graph display.
   * @type {number}
   * @memberof ResponsiveLineGraphProps
   */
  selectedYear: number;

  /**
   * Configuration for the lines to display on the graph after filtering.
   * @type {LineSeriesConfig[]}
   * @memberof ResponsiveLineGraphProps
   */
  filteredDataForLines: LineSeriesConfig[];

  /**
   * Tailwind CSS classes to apply to the graph container.
   * @type {string}
   * @memberof ResponsiveLineGraphProps
   */
  tailwindClasses: string;

  /**
   * Whether to display the inflation tag on the graph.
   * @type {boolean}
   * @memberof ResponsiveLineGraphProps
   */
  withInflationTag?: boolean;
}

/**
 * Properties for a responsive double line graph component.
 * @export
 * @interface ResponsiveDoubleLineGraphProps
 */
export interface ResponsiveDoubleLineGraphProps {
  /**
   * The currently selected year for the graph display.
   * @type {number}
   * @memberof ResponsiveDoubleLineGraphProps
   */
  selectedYear: number;

  /**
   * Filtered time series data for the first line.
   * @type {{ date: Date; value: number }[]}
   * @memberof ResponsiveDoubleLineGraphProps
   */
  filteredData1: { date: Date; value: number }[];

  /**
   * Filtered time series data for the second line.
   * @type {{ date: Date; value: number }[]}
   * @memberof ResponsiveDoubleLineGraphProps
   */
  filteredData2: { date: Date; value: number }[];

  /**
   * Tailwind CSS classes to apply to the graph container.
   * @type {string}
   * @memberof ResponsiveDoubleLineGraphProps
   */
  tailwindClasses: string;
}

/**
 * Represents the direction of a trend line.
 * @export
 * @typedef {"up" | "down" | "flat"} Direction
 */
export type Direction = "up" | "down" | "flat";

/**
 * Represents the directions for two different lines.
 * @export
 * @interface Directions
 */
export interface Directions {
  /**
   * Direction of the first line.
   * @type {Direction}
   * @memberof Directions
   */
  directionLine1: Direction;

  /**
   * Direction of the second line.
   * @type {Direction}
   * @memberof Directions
   */
  directionLine2: Direction;
}

/**
 * Configuration for colors based on line direction.
 * @export
 * @interface ColorBasedOnLineDirection
 */
export interface ColorBasedOnLineDirection {
  /**
   * Color to use when the line direction is up.
   * @type {string}
   * @memberof ColorBasedOnLineDirection
   */
  upColor: string;

  /**
   * Color to use when the line direction is down.
   * @type {string}
   * @memberof ColorBasedOnLineDirection
   */
  downColor: string;

  /**
   * Color to use when the line direction is flat.
   * @type {string}
   * @memberof ColorBasedOnLineDirection
   */
  flatColor: string;

  /**
   * The current direction of the line.
   * @type {Direction}
   * @memberof ColorBasedOnLineDirection
   */
  direction: Direction;
}

/**
 * Properties for the projected line graph component.
 * @export
 * @interface ProjectedLineGraphProps
 */
export interface ProjectedLineGraphProps {
  /**
   * Width of the graph in pixels.
   * @type {number}
   * @memberof ProjectedLineGraphProps
   */
  width: number;

  /**
   * Height of the graph in pixels.
   * @type {number}
   * @memberof ProjectedLineGraphProps
   */
  height: number;

  /**
   * Configuration for all lines to display on the graph.
   * @type {LineSeriesConfig[]}
   * @memberof ProjectedLineGraphProps
   */
  lineConfigs: LineSeriesConfig[];

  /**
   * Optional margin configuration for the graph.
   * @type {{ top: number; right: number; bottom: number; left: number }}
   * @memberof ProjectedLineGraphProps
   */
  margin?: { top: number; right: number; bottom: number; left: number };

  /**
   * Function to show the tooltip on hover.
   * @type {(args: any) => void}
   * @memberof ProjectedLineGraphProps
   */
  showTooltip?: (args: any) => void;

  /**
   * Function to hide the tooltip.
   * @type {() => void}
   * @memberof ProjectedLineGraphProps
   */
  hideTooltip?: () => void;

  /**
   * Data to display in the tooltip.
   * @type {any}
   * @memberof ProjectedLineGraphProps
   */
  tooltipConfigs?: any;

  /**
   * Top position of the tooltip in pixels.
   * @type {number}
   * @memberof ProjectedLineGraphProps
   */
  tooltipTop?: number;

  /**
   * Left position of the tooltip in pixels.
   * @type {number}
   * @memberof ProjectedLineGraphProps
   */
  tooltipLeft?: number;

  /**
   * Whether to display the inflation tag.
   * @type {boolean}
   * @memberof ProjectedLineGraphProps
   */
  withInlfationTag?: boolean;

  /**
   * Array of years to display on the x-axis.
   * @type {number[]}
   * @memberof ProjectedLineGraphProps
   */
  years?: number[];

  /**
   * The currently selected year.
   * @type {number}
   * @memberof ProjectedLineGraphProps
   */
  selectedYear?: number;

  /**
   * Function to set the selected year.
   * @type {(year: number) => void}
   * @memberof ProjectedLineGraphProps
   */
  setSelectedYear?: (year: number) => void;

  /**
   * The retirement year for projections.
   * @type {number}
   * @memberof ProjectedLineGraphProps
   */
  retirementYear?: number;

  /**
   * Function to edit the retirement year.
   * @type {(year: number) => void}
   * @memberof ProjectedLineGraphProps
   */
  editRetirementYear?: (year: number) => void;
}

/**
 * Represents projection data with and without inflation adjustments.
 * @export
 * @interface projectionData
 */
export interface projectionData {
  /**
   * Projection data without inflation adjustments.
   * @type {{ data: TimeSeriesData[] }}
   * @memberof projectionData
   */
  noInflationData: { data: TimeSeriesData[] };

  /**
   * Projection data with inflation adjustments.
   * @type {{ data: TimeSeriesData[] }}
   * @memberof projectionData
   */
  inflationData: { data: TimeSeriesData[] };

  /**
   * The current projection data being displayed.
   * @type {TimeSeriesData[]}
   * @memberof projectionData
   */
  data: TimeSeriesData[];
}

/**
 * Properties for the primary graph header component.
 * @export
 * @interface PrimaryGraphHeaderProps
 */
export interface PrimaryGraphHeaderProps {
  /**
   * Unified configuration array pairing each line with its optional tooltip state.
   * @type {GraphConfig[]}
   * @memberof PrimaryGraphHeaderProps
   */
  graphConfigs: GraphConfig[];

  /**
   * Whether to display the inflation tag.
   * @type {boolean}
   * @memberof PrimaryGraphHeaderProps
   */
  withInflationTag?: boolean;

  /**
   * Array of years available for selection.
   * @type {number[]}
   * @memberof PrimaryGraphHeaderProps
   */
  years: number[];
}

/**
 * Properties for the projected net worth graph component.
 * @export
 * @interface ProjectedNetWorthGraphProps
 */
export interface ProjectedNetWorthGraphProps {
  /**
   * Future projection data, which can be valid data, undefined, or an Error.
   * @type {FutureProjectionData | undefined | Error}
   * @memberof ProjectedNetWorthGraphProps
   */
  futureProjectionData: FutureProjectionData | undefined | Error;

  /**
   * Error object if the future projection fetch failed.
   * @type {Error | null}
   * @memberof ProjectedNetWorthGraphProps
   */
  futureProjectionError?: Error | null;

  /**
   * Indicates whether there is an error with the future projection.
   * @type {boolean}
   * @memberof ProjectedNetWorthGraphProps
   */
  futureProjectionHasError: boolean;

  /**
   * Indicates whether the future projection data is currently loading.
   * @type {boolean}
   * @memberof ProjectedNetWorthGraphProps
   */
  futureProjectionLoading: boolean;
}
