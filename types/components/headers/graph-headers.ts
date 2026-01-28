import { GraphConfig } from "@/types/components/admin/graphs/graph-config";

export interface GraphHeaderProps {
  label: string;
  ref?: React.Ref<HTMLHeadingElement>;
  className?: string;
}

export interface GraphLineSummariesProps {
  graphConfigs: GraphConfig[];
}


type Direction = "up" | "down" | "flat";

export interface ColorBasedOnLineDirection {
  upColor: string;
  downColor: string;
  flatColor: string;
  direction: Direction;
}