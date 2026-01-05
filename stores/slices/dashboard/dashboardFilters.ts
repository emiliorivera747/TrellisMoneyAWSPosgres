import { StateCreator } from "zustand";
import { DashboardFiltersSlice } from "@/types/stores/dashboard";
const currentYear = Number(new Date().getFullYear().toString());
const DEFAULT_RETIREMENT_YEAR = currentYear + 40;

/**
 * Zustand slice for managing dashboard filters state.
 *
 * @param set - Zustand's `set` function to update the state.
 * @returns State properties and methods for managing filters and mode.
 */
export const createDashboardFilterSlice: StateCreator<DashboardFiltersSlice> = (
  set
) => ({
  selectedYear: DEFAULT_RETIREMENT_YEAR,
  selectedFilter: "withNoInflation",
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
