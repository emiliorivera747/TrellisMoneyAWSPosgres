export type InflationCategory =
  | "Beats Inflation"
  | "Breaks Even With Inflation"
  | "Falling Behind Inflation";

export interface InflationTagProps {
  inflation_category: InflationCategory;
  bg_color: string;
  text_color: string;
  svg_color: string;
}
