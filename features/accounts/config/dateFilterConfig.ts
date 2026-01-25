/**
 * Represents a configuration item for date filtering.
 * @export
 * @typedef {Object} DateFilterConfigItem
 */
export type DateFilterConfigItem = {
  /**
   * Display label for the date filter option.
   * @type {string}
   * @memberof DateFilterConfigItem
   */
  label: string;

  /**
   * Unique value identifier for the date filter option.
   * @type {string}
   * @memberof DateFilterConfigItem
   */
  value: string;

  /**
   * Start date for the filter range.
   * @type {Date}
   * @memberof DateFilterConfigItem
   */
  startDate: Date;

  /**
   * End date for the filter range.
   * @type {Date}
   * @memberof DateFilterConfigItem
   */
  endDate: Date;
};

export const dateFilterConfig: DateFilterConfigItem[] = [
  {
    label: "1D",
    value: "1D",
    startDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now()),
  },
  {
    label: "1W",
    value: "1W",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now()),
  },
  {
    label: "1M",
    value: "1M",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now()),
  },
  {
    label: "3M",
    value: "3M",
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now()),
  },
  {
    label: "YTD",
    value: "YTD",
    startDate: new Date(new Date().getFullYear(), 0, 1),
    endDate: new Date(Date.now()),
  },
  {
    label: "ALL",
    value: "ALL",
    startDate: new Date(0),
    endDate: new Date(Date.now()),
  },
];
