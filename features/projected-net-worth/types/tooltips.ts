import { TimeSeriesData } from "@/types/components/admin/graphs/data";
import { TooltipPayload } from "@/types/components/admin/graphs/tooltips";

export interface RenderTooltipContentProps {
    tooltipPayload: TooltipPayload | null;
    data: TimeSeriesData[];
    withYears?: boolean;
    lineName?: string;
  }