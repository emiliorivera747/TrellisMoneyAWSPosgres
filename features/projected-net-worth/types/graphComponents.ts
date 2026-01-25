import { LineSeriesConfig, TimeSeriesData } from "@/types/components/admin/graphs/data";
import { FutureProjectionData } from "@/types/future-projections/futureProjections";

export type ProjectedNetWorth = {
  value: String;
  data: TimeSeriesData[];
};
export interface DoubleLineGraphProps {
  width: number;
  selectedYear: number;
  height: number;
  data1: TimeSeriesData[];
  data2: TimeSeriesData[];
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
  filteredDataForLines: LineSeriesConfig[];
  tailwindClasses: string;
  withInflationTag?: boolean;
}

export interface ResponsiveDoubleLineGraphProps {
  selectedYear: number;
  filteredData1: { date: Date; value: number }[];
  filteredData2: { date: Date; value: number }[];
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
  linePayloads: LineSeriesConfig[];
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
  noInflationData: { data: TimeSeriesData[] };
  inflationData: { data: TimeSeriesData[] };
  data: TimeSeriesData[];
}

export interface PrimaryGraphHeaderProps {
  linePayloads: LineSeriesConfig[];
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
