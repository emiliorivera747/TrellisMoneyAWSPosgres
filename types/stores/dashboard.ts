import { InflationFilters } from "@/features/projected-net-worth/types/filters";

/**
 * Represents the dashboard filters slice state and actions.
 * @export
 * @interface DashboardFiltersSlice
 */
export interface DashboardFiltersSlice {
  /**
   * The selected projected year.
   * @type {number}
   * @memberof DashboardFiltersSlice
   */
  selectedProjectedYear: number;
  /**
   * The retirement year.
   * @type {number}
   * @memberof DashboardFiltersSlice
   */
  retirementYear: number;
  /**
   * The selected inflation filter.
   * @type {InflationFilters}
   * @memberof DashboardFiltersSlice
   */
  selectedInflationFilter: InflationFilters;
  /**
   * The current mode (edit or view).
   * @type {"edit" | "view"}
   * @memberof DashboardFiltersSlice
   */
  mode: "edit" | "view";

  /**
   * Sets the selected projected year.
   * @type {(year: number) => void}
   * @memberof DashboardFiltersSlice
   */
  setSelectedProjectedYear: (year: number) => void;
  /**
   * Sets the retirement year.
   * @type {(year: number) => void}
   * @memberof DashboardFiltersSlice
   */
  setRetirementYear: (year: number) => void;
  /**
   * Sets the selected inflation filter.
   * @type {(filter: InflationFilters) => void}
   * @memberof DashboardFiltersSlice
   */
  setSelectedInflationFilter: (filter: InflationFilters) => void;
  /**
   * Toggles between edit and view mode.
   * @type {() => void}
   * @memberof DashboardFiltersSlice
   */
  toggleMode: () => void;
  /**
   * Sets the mode to either edit or view.
   * @type {(mode: "edit" | "view") => void}
   * @memberof DashboardFiltersSlice
   */
  setMode: (mode: "edit" | "view") => void;
}
