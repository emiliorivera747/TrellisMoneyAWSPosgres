export interface SecurityData {
  date: string;
  close: number;
}

export interface LineGraphProps {
  width: number;
  selectedYear: number;
  height: number;
  data: SecurityData[];
  margin?: { top: number; right: number; bottom: number; left: number };
}

export interface RenderTooltipContentProps {
  tooltipData: SecurityData | null;
  data: SecurityData[];
}