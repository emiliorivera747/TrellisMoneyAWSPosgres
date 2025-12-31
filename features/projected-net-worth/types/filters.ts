export type InflationFilters = "withInflation" | "withNoInflation" | "isBoth";

export interface LineGraphFilterButtonsProps {
  selectedFilter: InflationFilters;
  handleFilterChange: (key: InflationFilters) => void;
}

export interface LineGraphFilterButtonProps {
  label: string;
  isSelected: boolean;
  svg_path?: string;
  color?: string;
  onClick?: () => void;
}

export interface FilterConfig {
  key: InflationFilters;
  label: string;
  svg_path: string;
  color: string;
}
