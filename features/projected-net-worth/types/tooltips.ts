import { SecurityData } from "@/types/graphs";
import { TooltipPayload } from "@/types/graphs";

export interface RenderTooltipContentProps {
    tooltipPayload: TooltipPayload | null;
    data: SecurityData[];
    withYears?: boolean;
  }