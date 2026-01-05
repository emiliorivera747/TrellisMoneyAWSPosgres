import { useStore } from "@/stores";
import { useShallow } from "zustand/react/shallow";

/**
 * A custom hook that retrieves account filter values from the store.
 * Utilizes shallow comparison to optimize re-renders.
 *
 * @returns An object containing:
 * - `startDate`: The start date filter.
 * - `endDate`: The end date filter.
 * - `selectedFilterAccount`: The currently selected account filter.
 */
export const useAccountsFilters = () =>
  useStore(
    useShallow((state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
      selectedFilter: state.selectedFilterAccount,
    }))
  );

/**
 * Custom hook to access account filter actions from the store.
 * Provides methods to set the start date, end date, and selected account filter.
 */
export const useAccountsFiltersActions = () =>
  useStore(
    useShallow((state) => ({
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
      setSelectedFilter: state.setSelectedFilterAccount,
    }))
  );


/**
 * A custom hook that provides access to account filters and their corresponding actions
 * from the application's store. This hook uses shallow comparison to optimize re-renders.
 *
 * @returns An object containing:
 * - `startDate`: The start date filter for accounts.
 * - `endDate`: The end date filter for accounts.
 * - `selectedFilter`: The currently selected account filter.
 * - `setStartDate`: A function to update the start date filter.
 * - `setEndDate`: A function to update the end date filter.
 * - `setSelectedFilter`: A function to update the selected account filter.
 */
export const useAccountsFiltersWithActions = () =>
  useStore(
    useShallow((state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
      selectedFilter: state.selectedFilterAccount,
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
      setSelectedFilter: state.setSelectedFilterAccount,
    }))
  );
