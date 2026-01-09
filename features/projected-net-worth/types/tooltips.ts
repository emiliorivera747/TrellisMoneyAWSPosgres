import { SecurityData } from "@/types/components/admin/graphs/graphs";
import { TooltipPayload } from "@/types/components/admin/graphs/graphs";

export interface RenderTooltipContentProps {
    tooltipPayload: TooltipPayload | null;
    data: SecurityData[];
    withYears?: boolean;
    lineName?: string;
  }