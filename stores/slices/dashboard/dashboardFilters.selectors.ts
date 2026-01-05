import { useDashboardStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

// ── State (data only) ────────────────────────────────────────
export const useDashboardFilters = () =>
  useDashboardStore(
    useShallow((state) => ({
      selectedYear: state.selectedYear,
      selectedFilter: state.selectedFilter,
      retirementYear: state.retirementYear,
      mode: state.mode,
    }))
  );

// ── Actions only (very stable – almost never change) ─────────
export const useDashboardFilterActions = () =>
  useDashboardStore(
    useShallow((state) => ({
      setSelectedYear: state.setSelectedYear,
      setSelectedFilter: state.setSelectedFilter,
      setRetirementYear: state.setRetirementYear,
      toggleMode: state.toggleMode,
    }))
  );

// ── Very granular (optional, great for tiny components) ──────
export const useSelectedYear = () =>
  useDashboardStore((state) => state.selectedYear);

export const useMode = () => useDashboardStore((state) => state.mode);

// ── Combined (sometimes convenient) ──────────────────────────
export const useDashboardFiltersWithActions = () =>
  useDashboardStore(
    useShallow((state) => ({
      selectedYear: state.selectedYear,
      selectedFilter: state.selectedFilter,
      mode: state.mode,
      setSelectedYear: state.setSelectedYear,
      toggleMode: state.toggleMode,
      setMode: state.setMode, // Added functionality to set the mode
    }))
  );
