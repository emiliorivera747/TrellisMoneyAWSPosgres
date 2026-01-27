import { StateCreator } from "zustand";
import { DashboardFiltersSlice } from "@/types/stores/dashboard";

const CURRENT_YEAR = 2026;
const DEFAULT_RETIREMENT_YEAR = CURRENT_YEAR + 40;

/**
 * Zustand slice for managing dashboard filters state.
 *
 * @param set - Zustand's `set` function to update the state.
 * @returns State properties and methods for managing filters and mode.
 */
export const createDashboardFilterSlice: StateCreator<DashboardFiltersSlice> = (
  set
) => ({
  selectedProjectedYear: DEFAULT_RETIREMENT_YEAR,
  retirementYear: DEFAULT_RETIREMENT_YEAR,
  selectedInflationFilter: "actual",
  mode: "view",

  setSelectedProjectedYear: (year) => set({ selectedProjectedYear: year }),
  setRetirementYear: (year) => set({ retirementYear: year }),
  setSelectedInflationFilter: (filter) => set({ selectedInflationFilter: filter }),
  toggleMode: () =>
    set((state) => ({ mode: state.mode === "edit" ? "view" : "edit" })),
  setMode: (mode) => set({ mode }),
});
