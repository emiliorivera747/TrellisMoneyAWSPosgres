export interface TooltipProps {
  tooltipLeft: number;
  tooltipTop?: number;
  margin: { top: number; right: number; bottom: number; left: number };
  innerHeight: number;
  // dataForLines: LineGraphData[];
  stockValueScale: (arg: number) => number; // y-axis
  tooltipData: tooltipData[];
}

export interface tooltipData{
  d: SecurityData;
  color: string;
  strokeWidth: number;
}

export interface LineGraphProp {
  width: number;
  height: number;
  dataForLines: LinePayload[];
  margin: any;
  showTooltip: (args: any) => void;
  hideTooltip: () => void;
  tooltipData: any;
  tooltipTop: number;
  tooltipLeft: number;
  lineColor?: string;
}

export interface SecurityData {
  date: Date;
  close: number;
}

export interface LinePayload{
  data: SecurityData[];
  color?: string;
  strokeWidth?: number;
}