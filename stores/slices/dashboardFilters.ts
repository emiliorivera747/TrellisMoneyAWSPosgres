import { StateCreator } from "zustand";
import { DashboardFiltersSlice } from "@/types/stores/dashboard";
const currentYear = Number(new Date().getFullYear().toString());
const DEFAULT_RETIREMENT_YEAR = currentYear + 40;

/**
 * Creates a slice of the dashboard filters state for a Zustand store.
 *
 * This slice manages the state related to dashboard filters, including the selected year,
 * selected filter, retirement year, and the current mode (view or edit). It also provides
 * methods to update these state properties.
 *
 * @param set - Zustand's `set` function to update the state.
 *
 * @returns An object containing the state properties and methods:
 * - `selectedYear`: The currently selected year (default is `DEFAULT_RETIREMENT_YEAR`).
 * - `selectedFilter`: The currently selected filter (default is `"isNoInflation"`).
 * - `retirementYear`: The retirement year (default is `DEFAULT_RETIREMENT_YEAR`).
 * - `mode`: The current mode, either `"view"` or `"edit"` (default is `"view"`).
 * - `setSelectedYear`: A function to update the `selectedYear`.
 * - `setSelectedFilter`: A function to update the `selectedFilter`.
 * - `setRetirementYear`: A function to update both `retirementYear` and `selectedYear`.
 * - `toggleMode`: A function to toggle the `mode` between `"view"` and `"edit"`.
 * - `setMode`: A function to explicitly set the `mode`.
 */
export const createDashboardFilterSlice: StateCreator<DashboardFiltersSlice> = (
  set
) => ({
  selectedYear: DEFAULT_RETIREMENT_YEAR,
  selectedFilter: "isNoInflation",
  retirementYear: DEFAULT_RETIREMENT_YEAR,
  mode: "view",

  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  setRetirementYear: (year) =>
    set({
      retirementYear: year,
      selectedYear: year,
    }),
  toggleMode: () =>
    set((state) => ({ mode: state.mode === "edit" ? "view" : "edit" })),
  setMode: (mode) => set({ mode }),
});
