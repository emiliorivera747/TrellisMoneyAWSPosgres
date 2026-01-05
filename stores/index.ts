import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { createDashboardFilterSlice } from "@/stores/slices/dashboard/dashboardFilters";

export type DashboardStore = ReturnType<typeof createDashboardFilterSlice>;

const combined: StateCreator<DashboardStore> = (...args) => ({
  ...createDashboardFilterSlice(...args),
});

/**
 * A Zustand store hook for managing the state of the dashboard.
 * 
 * This store is enhanced with the `devtools` middleware for debugging purposes,
 * allowing you to inspect and manipulate the store's state using Redux DevTools.
 * 
 * @constant
 * @type {DashboardStore}
 * @function
 * 
 * @example
 * // Usage in a React component
 * const dashboardState = useDashboardStore((state) => state.someProperty);
 * 
 * @see https://github.com/pmndrs/zustand - Zustand documentation
 * @see https://github.com/zalmoxisus/redux-devtools-extension - Redux DevTools
 */
export const useDashboardStore = create<DashboardStore>()(
  devtools(combined, { name: "DashboardStore" })
);
