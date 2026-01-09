import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { AccountGraphFilter } from "@/features/accounts/types/graph";
import { curveMonotoneX } from "@visx/curve";
import { ReactNode } from "react";

/**
 * Represents the properties for a tooltip component in a graph.
 */
export interface TooltipProps {
  /**
   * The horizontal position of the tooltip, in pixels.
   */
  tooltipLeft: number;

  /**
   * The vertical position of the tooltip, in pixels (optional).
   */
  tooltipTop?: number;

  /**
   * The margin object defining the spacing around the graph.
   * - `top`: The top margin, in pixels.
   * - `right`: The right margin, in pixels.
   * - `bottom`: The bottom margin, in pixels.
   * - `left`: The left margin, in pixels.
   */
  margin: { top: number; right: number; bottom: number; left: number };

  /**
   * The inner height of the graph, in pixels.
   */
  innerHeight: number;

  /**
   * A function that maps a stock value to a scaled value for positioning.
   * @param arg - The stock value to be scaled.
   * @returns The scaled value.
   */
  stockValueScale: (arg: number) => number;

  /**
   * The data to be displayed in the tooltip, represented as an array of payloads.
   */
  tooltipData: TooltipPayload[];

  /**
   * The possible directions for the tooltip to be displayed.
   */
  directions: Direction[];
}

/**
 * Represents the properties for a responsive line graph component.
 */
export interface ResponsiveLineGraphProps {
  /**
   * The CSS class name(s) to apply to the graph component.
   */
  className: string;

  /**
   * The React component to be rendered as the graph.
   * This component can accept any props.
   */
  GraphComponent: React.ComponentType<any>;

  /**
   * A reference to the HTML element, which can be either a button or a div.
   */
  ref: React.Ref<HTMLButtonElement | HTMLDivElement>;

  /**
   * Additional properties that can be passed to the graph component.
   */
  [key: string]: any;
}

/**
 * Represents the payload data for a tooltip in a graph.
 */
export interface TooltipPayload {
  /**
   * The time series data associated with the tooltip.
   */
  d: TimeSeriesData;

  /**
   * The color associated with the tooltip's data point or line.
   */
  color: string;

  /**
   * The stroke width of the line associated with the tooltip's data point.
   */
  strokeWidth: number;

  /**
   * The array of time series data points related to the tooltip.
   */
  data: TimeSeriesData[];

  /**
   * The payload data for the line associated with the tooltip.
   */
  linePayload: LinePayload;
}

/**
 * Represents the data structure for time series data used in graphs.
 */
export interface TimeSeriesData {
  /**
   * The date associated with the data point.
   */
  date: Date;

  /**
   * The closing value of the data point.
   */
  close: number;
}

export interface LineGraphTimeValueProps {
  /**
   * The width of the graph
   */
  width: number;

  /**
   * The height of the graph
   */
  height: number;

  /**
   * The data for the lines to be rendered. Configuration should be provided.
   */
  linePayloads: LinePayload[];

  /**
   * The function to show the tooltip.
   * @param args
   * @returns
   */
  showTooltip: (args: any) => void;

  /**
   * The function to hide the tooltip.
   */
  hideTooltip: () => void;

  /**
   * The data to be displayed in the tooltip.
   */
  tooltipData: TooltipPayload[];

  /**
   * The top position of the tooltip.
   */
  tooltipTop: number;

  /**
   * The left position of the tooltip.
   */
  tooltipLeft: number;

  /**
   * The margin of the graph.
   */
  margin?: { top: number; right: number; bottom: number; left: number };

  /**
   * The curve of the line graph.
   */
  curve?: typeof curveMonotoneX;

  /**
   * The background fill color of the graph.
   */
  backgroundFill?: string;
}

export interface SecurityData {
  date: Date;
  close: number;
}

export interface LineColor {
  upColor: string;
  downColor: string;
  flatColor: string;
}

export interface tagTextColor {
  upColor: string;
  downColor: string;
  flatColor: string;
}

export interface tagBgColor {
  upColor: string;
  downColor: string;
  flatColor: string;
}

/**
 * Represents the color configuration for a subheader in a graph.
 */
export interface subheaderColor {
  /**
   * The color used to indicate an upward trend or positive change.
   */
  upColor: string;

  /**
   * The color used to indicate a downward trend or negative change.
   */
  downColor: string;

  /**
   * The color used to indicate a flat or neutral trend.
   */
  flatColor: string;
}

export interface LinePayload {
  /**
   * The data of Line to be rendered.
   */
  lineData: TimeSeriesData[];

  /**
   * The color of the line.
   */
  colorConfig?: ColorConfig;

  /**
   * The stroke width of the line.
   */
  strokeWidth?: number;

  /**
   * The filter to be applied to the line.
   */
  value?: string;
}

export interface ColorConfig {
  /**
   * The color of the line
   */
  lineColor: LineColor;

  /**
   * The color of the tag text
   */
  tagTextColor: tagTextColor;

  /**
   * The color of the tag background
   */
  tagBgColor: tagBgColor;

  /**
   * The color of the subheader
   */
  subheaderColor: subheaderColor;
}

/**
 * Represents the properties for a line graph tooltip component.
 */
export interface LineGraphTooltipProps {
  /**
   * The margin object defining the spacing around the graph (optional).
   * - `top`: The top margin, in pixels.
   */
  margin?: { top: number };

  /**
   * The horizontal position of the tooltip, in pixels.
   */
  tooltipLeft: number;

  /**
   * The default styles applied to the tooltip.
   */
  defaultStyles: React.CSSProperties;

  /**
   * The data to be displayed in the tooltip.
   */
  tooltipData: any;
}

/**
 * Represents the properties for a component that displays value and price change graphs.
 */
export interface ValueAndPriceChangeProps {
  /**
   * The payload data for the tooltip, which provides information about the graph's data points.
   * Can be `null` if no tooltip data is available.
   */
  tooltipPayload: TooltipPayload | null;

  /**
   * The time series data to be displayed in the graph.
   */
  data: TimeSeriesData[];

  /**
   * Indicates whether the graph should display years in its labels or data points.
   * Defaults to `false` if not provided.
   */
  withYears?: boolean;

  /**
   * The Tailwind CSS classes to be applied to the main header of the graph.
   * Can be used for custom styling.
   */
  mainHeaderTailwindCss?: string;

  /**
   * The Tailwind CSS classes to be applied to the sub-header of the graph.
   * Can be used for custom styling.
   */
  subHeaderTailwindCss?: string;

  /**
   * Indicates whether additional informational content should be displayed in the graph.
   * Defaults to `false` if not provided.
   */
  withInfo?: boolean;

  /**
   * The name of the line in the graph, used for labeling or identification purposes.
   */
  lineName?: string;
}

/**
 * Represents the properties for a graph component with a header, time values, and tooltip data.
 */
export interface HeaderTimeValueGraphProps {
  /**
   * The child components or elements to be rendered within the graph component.
   */
  children: ReactNode;

  /**
   * The payloads representing the data for the lines in the graph.
   * Each payload contains information about the line's data points.
   */
  linePayloads: LinePayload[];

  /**
   * The data to be displayed in the tooltip, represented as an array of payloads.
   * Each payload contains information about the data point being hovered over.
   */
  tooltipData: TooltipPayload[];
}

export interface TitleProps {
  /**
   * The children of the title.
   */
  children: ReactNode;

  /**
   * The class name of the title.
   */
  className?: string;

  /**
   * The ref of the title.
   */
  ref?: React.Ref<HTMLButtonElement | HTMLDivElement>;
}

export interface ValueProp {
  /**
   * The value of the line.
   */
  lineIndex: number;

  /**
   * The ref of the value.
   */
  ref?: React.Ref<HTMLButtonElement | HTMLDivElement>;

  /**
   * The class name of the value.
   */
  className?: string;
}

export interface ValueChangeProps {
  /**
   * The value of the line.
   */
  lineIndex: number;

  /**
   * The ref of the value.
   */
  ref?: React.Ref<HTMLParagraphElement>;

  /**
   * The class name of the value.
   */
  className?: string;

  /**
   * With years or not.
   */
  withYears?: boolean;
}

export interface ValuePriceChangeLabelProps {
  /**
   * The difference in value
   */
  valueDifference: number;
  /**
   * The rate of change
   */
  rateOfChange: number;
  /**
   * The ref of the value.
   */
  ref?: React.Ref<HTMLParagraphElement>;

  /**
   * The class name of the value.
   */
  className?: string;
}

export interface ValuePriceChangeLabelProps {
  /**
   * The ref of the value.
   */
  ref?: React.Ref<HTMLParagraphElement>;

  /**
   * The class name of the value.
   */
  className?: string;
}

export interface GraphFilterConfig {
  /**
   * The key of the filter.
   */
  key: AccountGraphFilter;
  /**
   * The label of the filter.
   */
  label: string;
  /**
   * The value of the filter.
   */
  svg_path: string;
  /**
   * The color of the filter.
   */
  color: string;
}

export interface LineGraphFilterButtonsProps {
  /**
   * Configuration for the filter.
   */
  filterConfig: GraphFilterConfig[];

  /**
   * The ref of the filter.
   */
  ref?: React.Ref<HTMLDivElement>;

  /**
   * The class name of the filter.
   */
  className?: string;
}

export interface GraphFilterButtonWithModalProps {
  /**
   * Configuration for the filter.
   */
  filterConfig: GraphFilterConfig[];

  /**
   * The ref of the filter.
   */
  ref?: React.Ref<HTMLDivElement>;

  /**
   * The class name of the filter.
   */
  className?: string;
}

export interface DateFilterConfig {
  /**
   * The label of the date filter.
   */
  label: string;

  /**
   * The value of the date filter.
   */
  value: string;

  /**
   * The start date of the date filter.
   */
  startData: Date;

  /**
   * The end date of the date filter.
   */
  endData: Date;
}

export interface DateFilterProps {
  /**
   * The data filter configuration.
   */
  dateFilter: DateFilterConfig[];

  /**
   * The function to handle the date filter change.
   */
  handleDateFilterChange: (startData: Date, endDate: Date) => void;
}
