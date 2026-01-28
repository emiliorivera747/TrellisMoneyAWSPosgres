import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";

export type NetWorthGraphHeaderProps = {
  lineConfigs: LineSeriesConfig[];
  tooltipConfigs: TooltipConfig[];
};
