import { UseFormRegister, Path, FieldValues, FieldErrors} from "react-hook-form";

export interface SecurityData {
  year: Date;
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

export interface GroupedDateSelectorProps<TFieldValues extends FieldValues> {
  years: number[];
  retirementYear: number;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  setSelectedYear: (year: number) => void;
  setRetirementYear: (year: number) => void;
}

export interface RetirementYearSectionMenuProps{
  retirementYear: number;
  selectYear: () => void;
  editRetirementYear: () => void;
  selectRetirementYear: (year: number) => void;
  showYearSelector: boolean;
  years: number[];
}


export interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}