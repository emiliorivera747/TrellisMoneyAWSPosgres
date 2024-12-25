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