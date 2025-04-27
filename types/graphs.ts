import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { curveMonotoneX } from "@visx/curve"; // Import CurveFactory
export interface TooltipProps {
  tooltipLeft: number;
  tooltipTop?: number;
  margin: { top: number; right: number; bottom: number; left: number };
  innerHeight: number;
  stockValueScale: (arg: number) => number; // y-axis
  tooltipData: TooltipPayload[];
  directions: Direction[];
}


export interface ResponsiveLineGraphProps {
  className: string;
  GraphComponent: React.ComponentType<any>; // Define GraphComponent type
  ref: React.Ref<HTMLButtonElement>;
  [key: string]: any; // Catch-all for any other props
}

export interface TooltipPayload{
  d: SecurityData;
  color: string;
  strokeWidth: number;
  data: TimeSeriesData[];
  linePayload: LinePayload;
}

export interface TimeSeriesData {
  date: Date;
  close: number;
}

export interface LineGraphProps {
  width: number;
  height: number;
  dataForLines: LinePayload[];
  showTooltip: (args: any) => void;
  hideTooltip: () => void;
  tooltipData: TimeSeriesData[];
  tooltipTop: number;
  tooltipLeft: number;
  data?: TimeSeriesData[];
  margin: { top: number; right: number; bottom: number; left: number };
  curve?: typeof curveMonotoneX;
  backgroundFill?: string;
}

export interface SecurityData {
  date: Date;
  close: number;
}

export interface lineColor {
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
  data: TimeSeriesData[];
  color?: string;
  tailwindTagTextColor?: string;
  tailwindTagBgColor?: string;
  tailwindPrimaryTextColor?: string;
  strokeWidth?: number;
  lineColor?: lineColor;
  tagTextColor?: tagTextColor;
  tagBgColor?: tagBgColor;
  subheaderColor?: subheaderColor;
  withMessage?: boolean;
  infoMessage?: string;
}


export interface LineGraphTooltipProps {
  margin: { top: number };
  tooltipLeft: number;
  defaultStyles: React.CSSProperties;
  tooltipData: any;
}