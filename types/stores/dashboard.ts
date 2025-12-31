import { InflationFilters } from "@/features/projected-net-worth/types/filters";

export interface DashboardFiltersSlice {
  selectedYear: number;
  selectedFilter: InflationFilters;
  retirementYear: number;
  mode: "edit" | "view";

  // actions
  setSelectedYear: (year: number) => void;
  setSelectedFilter: (filter: InflationFilters) => void;
  setRetirementYear: (year: number) => void;
  toggleMode: () => void;
  setMode: (mode: "edit" | "view") => void;
}
