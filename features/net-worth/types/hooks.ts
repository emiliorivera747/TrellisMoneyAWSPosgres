/**
 * Properties for the useFilterNetWorth hook.
 * @export
 * @interface UseFilterNetWorthProps
 */
export interface UseFilterNetWorthProps {
  /**
   * The filter to apply to the net worth data.
   * @type {string}
   * @memberof UseFilterNetWorthProps
   */
  filter: string;

  /**
   * The start date for filtering the net worth data.
   * @type {Date}
   * @memberof UseFilterNetWorthProps
   */
  startDate: Date;

  /**
   * The end date for filtering the net worth data.
   * @type {Date}
   * @memberof UseFilterNetWorthProps
   */
  endDate: Date;
}
