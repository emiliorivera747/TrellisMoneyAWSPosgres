import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { curveMonotoneX } from "@visx/curve";
import { ReactNode } from "react";

export interface TooltipProps {
  tooltipLeft: number;
  tooltipTop?: number;
  margin: { top: number; right: number; bottom: number; left: number };
  innerHeight: number;
  stockValueScale: (arg: number) => number;
  tooltipData: TooltipPayload[];
  directions: Direction[];
}

export interface ResponsiveLineGraphProps {
  className: string;
  GraphComponent: React.ComponentType<any>;
  ref: React.Ref<HTMLButtonElement | HTMLDivElement>;
  [key: string]: any;
}

export interface TooltipPayload {
  d: TimeSeriesData;
  color: string;
  strokeWidth: number;
  data: TimeSeriesData[];
  linePayload: LinePayload;
}

export interface TimeSeriesData {
  date: Date;
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

export interface subheaderColor {
  upColor: string;
  downColor: string;
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

export interface LineGraphTooltipProps {
  margin?: { top: number };
  tooltipLeft: number;
  defaultStyles: React.CSSProperties;
  tooltipData: any;
}

export interface ValueAndPriceChangeProps {
  tooltipPayload: TooltipPayload | null;
  data: TimeSeriesData[];
  withYears?: boolean;
  mainHeaderTailwindCss?: string;
  subHeaderTailwindCss?: string;
  withInfo?: boolean;
  lineName?: string;
}

export interface HeaderTimeValueGraphProps {
  children: ReactNode;
  linePayloads: LinePayload[];
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
  key: string;
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
   * The key of the filter.
   */
  selectedFilter: string;
  /**
   * The label of the filter.
   */
  handleFilterChange: (key: string) => void;

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
   * The key of the filter.
   */
  selectedFilter: string;
  /**
   * The label of the filter.
   */
  handleFilterChange: (key: string) => void;

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
