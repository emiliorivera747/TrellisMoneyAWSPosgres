import { AccountGraphFilter } from "@/features/accounts/types/graph";

/**
 * Represents the state and actions for filtering account data.
 * @export
 * @interface AccountFilterSlice
 */
export interface AccountFilterSlice {
  /**
   * The start date for the account filter range.
   * @type {Date}
   * @memberof AccountFilterSlice
   */
  startDate: Date;

  /**
   * The end date for the account filter range.
   * @type {Date}
   * @memberof AccountFilterSlice
   */
  endDate: Date;

  /**
   * The currently selected account graph filter.
   * @type {AccountGraphFilter}
   * @memberof AccountFilterSlice
   */
  selectedFilterAccount: AccountGraphFilter;

  /**
   * Updates the start date for the account filter range.
   * @type {(date: Date) => void}
   * @memberof AccountFilterSlice
   */
  setStartDate: (date: Date) => void;

  /**
   * Updates the end date for the account filter range.
   * @type {(date: Date) => void}
   * @memberof AccountFilterSlice
   */
  setEndDate: (date: Date) => void;

  /**
   * Updates the selected account graph filter.
   * @type {(filter: AccountGraphFilter) => void}
   * @memberof AccountFilterSlice
   */
  setSelectedFilterAccount: (filter: AccountGraphFilter) => void;
}
