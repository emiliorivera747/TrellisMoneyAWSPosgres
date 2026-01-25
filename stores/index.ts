import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { createDashboardFilterSlice } from "@/stores/slices/dashboard/dashboardFilters";
import { createAccountFilterSlice } from "@/stores/slices/accounts/accountFilters";

/**
 * Combined store type that merges dashboard filter and account filter slices.
 * @export
 * @typedef {ReturnType<typeof createDashboardFilterSlice> & ReturnType<typeof createAccountFilterSlice>} Store
 */
export type Store = ReturnType<typeof createDashboardFilterSlice> &
  ReturnType<typeof createAccountFilterSlice>;

const combined: StateCreator<Store> = (...args) => ({
  ...createDashboardFilterSlice(...args),
  ...createAccountFilterSlice(...args),
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
export const useStore = create<Store>()(
  devtools(combined, { name: "DashboardStore" })
);
