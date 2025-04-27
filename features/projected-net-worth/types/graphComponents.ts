import { LinePayload } from "@/types/graphs";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
export interface SecurityData {
  date: Date;
  close: number;
}
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
  dataForLines: LinePayload[];
  margin: any;
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

export interface ProjectedNetWorthGraphProps {
  projectionData?: projectedNetWorth[] | null;
  projectionLoading: boolean;
  projectionError: Error | null;
  selectedYear: number;
  handleYearSelection: (year: number) => void;
  handleFilterChange: (key: InflationFilters) => void;
  selectedFilter: InflationFilters;
}

export interface projectionData {
  noInflationData: { data: SecurityData[] };
  inflationData: { data: SecurityData[] };
  data: SecurityData[];
}

export interface projectedNetWorth {
  value: String;
  data: SecurityData[];
}
