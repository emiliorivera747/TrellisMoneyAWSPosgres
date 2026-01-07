import { useStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

// ── State (data only) ────────────────────────────────────────
export const useDashboardFilters = () =>
  useStore(
    useShallow((state) => ({
      selectedProjectedYear: state.selectedProjectedYear,
      selectedInflationFilter: state.selectedInflationFilter,
      mode: state.mode,
    }))
  );

// ── Actions only (very stable – almost never change) ─────────
export const useDashboardFilterActions = () =>
  useStore(
    useShallow((state) => ({
      setSelectedProjectedYear: state.setSelectedProjectedYear,
      setSelectedInflationFilter: state.setSelectedInflationFilter,
      toggleMode: state.toggleMode,
    }))
  );

// ── Very granular (optional, great for tiny components) ──────
export const useSelectedYear = () => useStore((state) => state.selectedProjectedYear);
export const useMode = () => useStore((state) => state.mode);

// ── Combined (sometimes convenient) ──────────────────────────
export const useDashboardFiltersWithActions = () =>
  useStore(
    useShallow((state) => ({
      selectedProjectedYear: state.selectedProjectedYear,
      selectedInflationFilter: state.selectedInflationFilter,
      mode: state.mode,
      setSelectedProjectedYear: state.setSelectedProjectedYear,
      toggleMode: state.toggleMode,
      setMode: state.setMode, 
    }))
  );
