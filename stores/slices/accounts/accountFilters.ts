import { StateCreator } from "zustand";
import { AccountFilterSlice } from "@/types/stores/accounts";
import { AccountGraphFilter } from "@/features/accounts/types/graph";

const DEFAULT_START_DATE = new Date();
const DEFAULT_END_DATE = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
);

/**
 * Creates a slice of the application state for managing account filters.
 * 
 * @param set - A function to update the state.
 * 
 * @returns An object containing:
 * - `startDate`: The default start date for filtering accounts.
 * - `endDate`: The default end date for filtering accounts.
 * - `selectedFilter`: The currently selected account filter (default is "net-worth").
 * - `setStartDate`: A function to update the `startDate`.
 * - `setEndDate`: A function to update the `endDate`.
 * - `setSelectedFilter`: A function to update the `selectedFilter`.
 */
export const createAccountFilterSlice: StateCreator<AccountFilterSlice> = (
  set
) => ({
  startDate: DEFAULT_START_DATE,
  endDate: DEFAULT_END_DATE,
  selectedFilterAccount: "net-worth",

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setSelectedFilterAccount: (filter: AccountGraphFilter) =>
    set({ selectedFilterAccount: filter }),
});
