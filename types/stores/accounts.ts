import { AccountGraphFilter } from "@/features/accounts/types/graph";

/**
 * Represents the state and actions for filtering account data.
 */
export interface AccountFilterSlice {
  /**
   * The start date for the account filter range.
   */
  startDate: Date;

  /**
   * The end date for the account filter range.
   */
  endDate: Date;

  /**
   * The currently selected account graph filter.
   */
  selectedFilterAccount: AccountGraphFilter;

  /**
   * Updates the start date for the account filter range.
   * @param date - The new start date.
   */
  setStartDate: (date: Date) => void;

  /**
   * Updates the end date for the account filter range.
   * @param date - The new end date.
   */
  setEndDate: (date: Date) => void;

  /**
   * Updates the selected account graph filter.
   * @param filter - The new account graph filter.
   */
  setSelectedFilterAccount: (filter: AccountGraphFilter) => void;
}
