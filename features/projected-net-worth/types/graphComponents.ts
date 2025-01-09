import {
  UseFormRegister,
  Path,
  FieldValues,
  FieldErrors,
} from "react-hook-form";

export interface SecurityData {
  date: Date;
  close: number;
}

export interface LineGraphProps {
  width: number;
  selectedYear: number;
  height: number;
  data: SecurityData[];
  margin?: { top: number; right: number; bottom: number; left: number };
  withInlfationTag?: boolean;
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

export interface RenderTooltipContentProps {
  tooltipData: SecurityData | null;
  data: SecurityData[];
  withYears?: boolean;
}

export interface GroupedDateSelectorProps{
  years: number[];
  retirementYear: number;
  setSelectedYear: (year: number) => void;
  setRetirementYear: (year: number) => void;
}

export interface RetirementYearSectionMenuProps {
  retirementYear: number;
  selectYear: () => void;
  editRetirementYear: () => void;
  selectRetirementYear: (year: number) => void;
  showYearSelector: boolean;
  years: number[];
}
export interface AfterRetirementSectionMenuProps {
  afterRetirementYears: number[];
  setSelectedYear: (year: number) => void;
  showAfterRetirement: boolean;
  headerFn: () => void;
}
export interface BeforeRetirementSectionMenuProps {
  beforeRetirementRanges: Record<string, number[]>;
  setSelectedYear: (year: number) => void;
  headerFn: () => void;
  showBeforeRetirement: boolean;
}
export interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export interface HeaderWithIconProps {
  actionFunction: () => void;
  label: string;
  icon: React.ReactNode;
  toolTipLabel: string;
}

export interface ListOfYearsProps {
  years: number[];
  actionFn: (year: number) => void;
}

export interface ListOfYearsGroupedByRangeProps {
  actionFn: (year: number) => void;
  beforeRetirementRanges: Record<string, number[]>;
}
export interface renderPrimaryDropDownMenuButtonProps {
  showYearSelector: boolean;
  selectYear: () => void;
  retirementYear: number;
}

export interface renderYearSelectorProps {
  showYearSelector: boolean;
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectRetirementYear: (year: number) => void;
}

export interface ResponsiveLineGraphProps {
  selectedYear: number;
  filteredData: { date: Date; close: number }[];
  tailwindClasses: string;
  withInflationTag?: boolean;
}

export interface ResponsiveDoubleLineGraphProps {
  selectedYear: number;
  filteredData1: { date: Date; close: number }[];
  filteredData2: { date: Date; close: number }[];
  tailwindClasses: string;
}

export type InflationCategory = "Beats Inflation" | "Breaks Even With Inflation" | "Falling Behind Inflation";

export interface InflationTagProps {
  inflation_category: InflationCategory;
  bg_color: string;
  text_color: string;
  svg_color: string;
}

export type Direction = "up" | "down" | "flat";

export interface ColorBasedOnLineDirection {
  upColor: string;
  downColor: string;
  flatColor: string;
  direction: Direction;
}