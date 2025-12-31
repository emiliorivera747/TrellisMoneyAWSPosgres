import { LinePayload } from "@/types/graphs";
import { FutureProjectionData } from "@/types/futureProjections";

export interface SecurityData {
  date: Date;
  close: number;
}

export type ProjectedNetWorth = {
  value: String;
  data: SecurityData[];
};
export interface DoubleLineGraphProps {
  width: number;
  selectedYear: number;
  height: number;
  data1: SecurityData[];
  data2: SecurityData[];
  margin?: { top: number; right: number; bottom: number; left: number };
}

export interface LineGraphTooltipProps {
  margin: { top: number };
  tooltipLeft: number;
  defaultStyles: React.CSSProperties;
  tooltipData: any;
}

export interface HeaderWithIconProps {
  actionFunction: () => void;
  label: string;
  icon: React.ReactNode;
  toolTipLabel: string;
}

export interface ResponsiveLineGraphProps<T> {
  selectedYear: number;
  filteredDataForLines: LinePayload[];
  tailwindClasses: string;
  withInflationTag?: boolean;
}

export interface ResponsiveDoubleLineGraphProps {
  selectedYear: number;
  filteredData1: { date: Date; close: number }[];
  filteredData2: { date: Date; close: number }[];
  tailwindClasses: string;
}

export type Direction = "up" | "down" | "flat";
export interface Directions {
  directionLine1: Direction;
  directionLine2: Direction;
}

export interface ColorBasedOnLineDirection {
  upColor: string;
  downColor: string;
  flatColor: string;
  direction: Direction;
}

export interface ProjectedLineGraphProps {
  width: number;
  height: number;
  linePayloads: LinePayload[];
  margin?: { top: number; right: number; bottom: number; left: number };
  showTooltip?: (args: any) => void;
  hideTooltip?: () => void;
  tooltipData?: any;
  tooltipTop?: number;
  tooltipLeft?: number;
  withInlfationTag?: boolean;
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  retirementYear: number;
  editRetirementYear: (year: number) => void;
}

export interface projectionData {
  noInflationData: { data: SecurityData[] };
  inflationData: { data: SecurityData[] };
  data: SecurityData[];
}

export interface PrimaryGraphHeaderProps {
  linePayloads: LinePayload[];
  tooltipData: any;
  withInflationTag?: boolean;
  years: number[];
}

export interface ProjectedNetWorthGraphProps {
  futureProjectionData: FutureProjectionData | undefined | Error;
  futureProjectionError?: Error | null;
  futureProjectionHasError: boolean;
  futureProjectionLoading: boolean;
}
