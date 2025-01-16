
import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { withInflation } from "@/features/projected-net-worth/utils/data/inflationInfo";
export interface TooltipProps {
  tooltipLeft: number;
  tooltipTop?: number;
  margin: { top: number; right: number; bottom: number; left: number };
  innerHeight: number;
  // dataForLines: LineGraphData[];
  stockValueScale: (arg: number) => number; // y-axis
  tooltipData: TooltipPayload[];
  directions: Direction[];
}

export interface TooltipPayload {
  d: SecurityData;
  color: string;
  strokeWidth: number;
  data: SecurityData[];
  linePayload: LinePayload;
}

export interface LineGraphProps {
  width: number;
  height: number;
  dataForLines: LinePayload[];
  showTooltip: (args: any) => void;
  hideTooltip: () => void;
  tooltipData: any;
  tooltipTop: number;
  tooltipLeft: number;
  lineColor?: string;
  withInlfationTag?: boolean;
  data?: SecurityData[];
  margin: { top: number; right: number; bottom: number; left: number };
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
  data: SecurityData[];
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

