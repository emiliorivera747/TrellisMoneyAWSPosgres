import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";

export interface GraphHeaderProps {
  label: string;
  ref?: React.Ref<HTMLHeadingElement>;
  className?: string;
}

export interface MultipleValPriceChangeProps {
  lineConfigs: LineSeriesConfig[];
  tooltipConfigs: TooltipConfig[];
}
