import { InflationFilters } from "@/features/projected-net-worth/types/filters";

export interface DashboardFiltersSlice {
  selectedProjectedYear: number;
  selectedInflationFilter: InflationFilters;
  mode: "edit" | "view";

  // actions
  setSelectedProjectedYear: (year: number) => void;
  setSelectedInflationFilter: (filter: InflationFilters) => void;
  toggleMode: () => void;
  setMode: (mode: "edit" | "view") => void;
}
