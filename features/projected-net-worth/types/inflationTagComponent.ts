import { LineSeriesConfig } from "@/types/components/admin/graphs/graphs";
export type InflationCategory = "up" | "down" | "flat";

export interface InflationTagProps {
  inflation_category?: InflationCategory;
  bg_color?: string;
  text_color?: string;
  svg_color?: string;
  linePayload: LineSeriesConfig;
}
