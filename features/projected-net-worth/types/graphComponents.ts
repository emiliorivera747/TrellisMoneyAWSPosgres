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
}