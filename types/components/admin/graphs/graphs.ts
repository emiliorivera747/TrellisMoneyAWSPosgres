import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { AccountGraphFilter } from "@/features/accounts/types/graph";
import { curveMonotoneX } from "@visx/curve";
import { ReactNode } from "react";

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
 * Represents the properties for a responsive line graph component.
 * @export
 * @interface ResponsiveLineGraphProps
 */
export interface ResponsiveLineGraphProps {
  /**
   * The CSS class name(s) to apply to the graph component.
   * @type {string}
   * @memberof ResponsiveLineGraphProps
   */
  className: string;

  /**
   * The React component to be rendered as the graph.
   * This component can accept any props.
   * @type {React.ComponentType<any>}
   * @memberof ResponsiveLineGraphProps
   */
  GraphComponent: React.ComponentType<any>;

  /**
   * A reference to the HTML element, which can be either a button or a div.
   * @type {React.Ref<HTMLButtonElement | HTMLDivElement>}
   * @memberof ResponsiveLineGraphProps
   */
  ref: React.Ref<HTMLButtonElement | HTMLDivElement>;

  /**
   * Additional properties that can be passed to the graph component.
   * @type {any}
   * @memberof ResponsiveLineGraphProps
   */
  [key: string]: any;
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
 * Represents the properties for a line graph time value component.
 * @export
 * @interface LineGraphTimeValueProps
 */
export interface LineGraphTimeValueProps {
  /**
   * The width of the graph.
   * @type {number}
   * @memberof LineGraphTimeValueProps
   */
  width: number;

  /**
   * The height of the graph.
   * @type {number}
   * @memberof LineGraphTimeValueProps
   */
  height: number;

  /**
   * The data for the lines to be rendered. Configuration should be provided.
   * @type {LineSeriesConfig[]}
   * @memberof LineGraphTimeValueProps
   */
  linePayloads: LineSeriesConfig[];

  /**
   * The function to show the tooltip.
   * @type {(args: any) => void}
   * @memberof LineGraphTimeValueProps
   */
  showTooltip: (args: any) => void;

  /**
   * The function to hide the tooltip.
   * @type {() => void}
   * @memberof LineGraphTimeValueProps
   */
  hideTooltip: () => void;

  /**
   * The data to be displayed in the tooltip.
   * @type {TooltipPayload[]}
   * @memberof LineGraphTimeValueProps
   */
  tooltipData: TooltipPayload[];

  /**
   * The top position of the tooltip.
   * @type {number}
   * @memberof LineGraphTimeValueProps
   */
  tooltipTop: number;

  /**
   * The left position of the tooltip.
   * @type {number}
   * @memberof LineGraphTimeValueProps
   */
  tooltipLeft: number;

  /**
   * The margin of the graph.
   * @type {{ top: number; right: number; bottom: number; left: number }}
   * @memberof LineGraphTimeValueProps
   */
  margin?: { top: number; right: number; bottom: number; left: number };

  /**
   * The curve of the line graph.
   * @type {typeof curveMonotoneX}
   * @memberof LineGraphTimeValueProps
   */
  curve?: typeof curveMonotoneX;

  /**
   * The background fill color of the graph.
   * @type {string}
   * @memberof LineGraphTimeValueProps
   */
  backgroundFill?: string;
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

/**
 * Represents the properties for a component that displays value and price change graphs.
 * @export
 * @interface ValueAndPriceChangeProps
 */
export interface ValueAndPriceChangeProps {
  /**
   * The payload data for the tooltip, which provides information about the graph's data points.
   * Can be `null` if no tooltip data is available.
   * @type {TooltipPayload | null}
   * @memberof ValueAndPriceChangeProps
   */
  tooltipPayload: TooltipPayload | null;

  /**
   * The time series data to be displayed in the graph.
   * @type {TimeSeriesData[]}
   * @memberof ValueAndPriceChangeProps
   */
  data: TimeSeriesData[];

  /**
   * Indicates whether the graph should display years in its labels or data points.
   * Defaults to `false` if not provided.
   * @type {boolean}
   * @memberof ValueAndPriceChangeProps
   */
  withYears?: boolean;

  /**
   * The Tailwind CSS classes to be applied to the main header of the graph.
   * Can be used for custom styling.
   * @type {string}
   * @memberof ValueAndPriceChangeProps
   */
  mainHeaderTailwindCss?: string;

  /**
   * The Tailwind CSS classes to be applied to the sub-header of the graph.
   * Can be used for custom styling.
   * @type {string}
   * @memberof ValueAndPriceChangeProps
   */
  subHeaderTailwindCss?: string;

  /**
   * Indicates whether additional informational content should be displayed in the graph.
   * Defaults to `false` if not provided.
   * @type {boolean}
   * @memberof ValueAndPriceChangeProps
   */
  withInfo?: boolean;

  /**
   * The name of the line in the graph, used for labeling or identification purposes.
   * @type {string}
   * @memberof ValueAndPriceChangeProps
   */
  lineName?: string;
}

/**
 * Represents the properties for a graph component with a header, time values, and tooltip data.
 * @export
 * @interface HeaderTimeValueGraphProps
 */
export interface HeaderTimeValueGraphProps {
  /**
   * The child components or elements to be rendered within the graph component.
   * @type {ReactNode}
   * @memberof HeaderTimeValueGraphProps
   */
  children: ReactNode;

  /**
   * The payloads representing the data for the lines in the graph.
   * Each payload contains information about the line's data points.
   * @type {LineSeriesConfig[]}
   * @memberof HeaderTimeValueGraphProps
   */
  linePayloads: LineSeriesConfig[];

  /**
   * The data to be displayed in the tooltip, represented as an array of payloads.
   * Each payload contains information about the data point being hovered over.
   * @type {TooltipPayload[]}
   * @memberof HeaderTimeValueGraphProps
   */
  tooltipData: TooltipPayload[];
}

/**
 * Represents the properties for a title component.
 * @export
 * @interface TitleProps
 */
export interface TitleProps {
  /**
   * The children of the title.
   * @type {ReactNode}
   * @memberof TitleProps
   */
  children: ReactNode;

  /**
   * The class name of the title.
   * @type {string}
   * @memberof TitleProps
   */
  className?: string;

  /**
   * The ref of the title.
   * @type {React.Ref<HTMLButtonElement | HTMLDivElement>}
   * @memberof TitleProps
   */
  ref?: React.Ref<HTMLButtonElement | HTMLDivElement>;
}

/**
 * Represents the properties for a value component.
 * @export
 * @interface ValueProp
 */
export interface ValueProp {
  /**
   * The value of the line.
   * @type {number}
   * @memberof ValueProp
   */
  lineIndex: number;

  /**
   * The ref of the value.
   * @type {React.Ref<HTMLButtonElement | HTMLDivElement>}
   * @memberof ValueProp
   */
  ref?: React.Ref<HTMLButtonElement | HTMLDivElement>;

  /**
   * The class name of the value.
   * @type {string}
   * @memberof ValueProp
   */
  className?: string;
}

/**
 * Represents the properties for a value change component.
 * @export
 * @interface ValueChangeProps
 */
export interface ValueChangeProps {
  /**
   * The value of the line.
   * @type {number}
   * @memberof ValueChangeProps
   */
  lineIndex: number;

  /**
   * The ref of the value.
   * @type {React.Ref<HTMLParagraphElement>}
   * @memberof ValueChangeProps
   */
  ref?: React.Ref<HTMLParagraphElement>;

  /**
   * The class name of the value.
   * @type {string}
   * @memberof ValueChangeProps
   */
  className?: string;

  /**
   * With years or not.
   * @type {boolean}
   * @memberof ValueChangeProps
   */
  withYears?: boolean;
}

/**
 * Represents the properties for a value price change label component.
 * @export
 * @interface ValuePriceChangeLabelProps
 */
export interface ValuePriceChangeLabelProps {
  /**
   * The difference in value.
   * @type {number}
   * @memberof ValuePriceChangeLabelProps
   */
  valueDifference: number;
  /**
   * The rate of change.
   * @type {number}
   * @memberof ValuePriceChangeLabelProps
   */
  rateOfChange: number;
  /**
   * The ref of the value.
   * @type {React.Ref<HTMLParagraphElement>}
   * @memberof ValuePriceChangeLabelProps
   */
  ref?: React.Ref<HTMLParagraphElement>;

  /**
   * The class name of the value.
   * @type {string}
   * @memberof ValuePriceChangeLabelProps
   */
  className?: string;
}

/**
 * Represents the configuration for a graph filter.
 * @export
 * @interface GraphFilterConfig
 */
export interface GraphFilterConfig {
  /**
   * The key of the filter.
   * @type {AccountGraphFilter}
   * @memberof GraphFilterConfig
   */
  key: AccountGraphFilter;
  /**
   * The label of the filter.
   * @type {string}
   * @memberof GraphFilterConfig
   */
  label: string;
  /**
   * The SVG path of the filter.
   * @type {string}
   * @memberof GraphFilterConfig
   */
  svg_path: string;
  /**
   * The color of the filter.
   * @type {string}
   * @memberof GraphFilterConfig
   */
  color: string;
}

/**
 * Represents the properties for line graph filter buttons.
 * @export
 * @interface LineGraphFilterButtonsProps
 */
export interface LineGraphFilterButtonsProps {
  /**
   * Configuration for the filter.
   * @type {GraphFilterConfig[]}
   * @memberof LineGraphFilterButtonsProps
   */
  filterConfig: GraphFilterConfig[];

  /**
   * The ref of the filter.
   * @type {React.Ref<HTMLDivElement>}
   * @memberof LineGraphFilterButtonsProps
   */
  ref?: React.Ref<HTMLDivElement>;

  /**
   * The class name of the filter.
   * @type {string}
   * @memberof LineGraphFilterButtonsProps
   */
  className?: string;
}

/**
 * Represents the properties for a graph filter button with modal.
 * @export
 * @interface GraphFilterButtonWithModalProps
 */
export interface GraphFilterButtonWithModalProps {
  /**
   * Configuration for the filter.
   * @type {GraphFilterConfig[]}
   * @memberof GraphFilterButtonWithModalProps
   */
  filterConfig: GraphFilterConfig[];

  /**
   * The ref of the filter.
   * @type {React.Ref<HTMLDivElement>}
   * @memberof GraphFilterButtonWithModalProps
   */
  ref?: React.Ref<HTMLDivElement>;

  /**
   * The class name of the filter.
   * @type {string}
   * @memberof GraphFilterButtonWithModalProps
   */
  className?: string;
}

/**
 * Represents the configuration for a date filter.
 * @export
 * @interface DateFilterConfig
 */
export interface DateFilterConfig {
  /**
   * The label of the date filter.
   * @type {string}
   * @memberof DateFilterConfig
   */
  label: string;

  /**
   * The value of the date filter.
   * @type {string}
   * @memberof DateFilterConfig
   */
  value: string;

  /**
   * The start date of the date filter.
   * @type {Date}
   * @memberof DateFilterConfig
   */
  startData: Date;

  /**
   * The end date of the date filter.
   * @type {Date}
   * @memberof DateFilterConfig
   */
  endData: Date;
}

/**
 * Represents the properties for a date filter component.
 * @export
 * @interface DateFilterProps
 */
export interface DateFilterProps {
  /**
   * The data filter configuration.
   * @type {DateFilterConfig[]}
   * @memberof DateFilterProps
   */
  dateFilter: DateFilterConfig[];

  /**
   * The function to handle the date filter change.
   * @type {(startData: Date, endDate: Date) => void}
   * @memberof DateFilterProps
   */
  handleDateFilterChange: (startData: Date, endDate: Date) => void;
}
