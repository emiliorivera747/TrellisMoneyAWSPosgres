/**
 * Represents the available inflation filter options.
 * @export
 * @typedef {"withInflation" | "withNoInflation" | "isBoth"} InflationFilters
 */
export type InflationFilters = "withInflation" | "withNoInflation" | "isBoth";

/**
 * Properties for the line graph filter buttons component.
 * @export
 * @interface LineGraphFilterButtonsProps
 */
export interface LineGraphFilterButtonsProps {
  /**
   * The currently selected filter.
   * @type {InflationFilters}
   * @memberof LineGraphFilterButtonsProps
   */
  selectedFilter: InflationFilters;

  /**
   * Function to handle filter changes.
   * @type {(key: InflationFilters) => void}
   * @memberof LineGraphFilterButtonsProps
   */
  handleFilterChange: (key: InflationFilters) => void;
}

/**
 * Properties for a single line graph filter button.
 * @export
 * @interface LineGraphFilterButtonProps
 */
export interface LineGraphFilterButtonProps {
  /**
   * Label text for the button.
   * @type {string}
   * @memberof LineGraphFilterButtonProps
   */
  label: string;

  /**
   * Indicates if this filter is currently selected.
   * @type {boolean}
   * @memberof LineGraphFilterButtonProps
   */
  isSelected: boolean;

  /**
   * SVG path data for the button icon.
   * @type {string}
   * @memberof LineGraphFilterButtonProps
   */
  svg_path?: string;

  /**
   * Color for the button.
   * @type {string}
   * @memberof LineGraphFilterButtonProps
   */
  color?: string;

  /**
   * Click handler function.
   * @type {() => void}
   * @memberof LineGraphFilterButtonProps
   */
  onClick?: () => void;
}

/**
 * Configuration for a filter option.
 * @export
 * @interface FilterConfig
 */
export interface FilterConfig {
  /**
   * Unique key for the filter.
   * @type {InflationFilters}
   * @memberof FilterConfig
   */
  key: InflationFilters;

  /**
   * Display label for the filter.
   * @type {string}
   * @memberof FilterConfig
   */
  label: string;

  /**
   * SVG path data for the filter icon.
   * @type {string}
   * @memberof FilterConfig
   */
  svg_path: string;

  /**
   * Color for the filter.
   * @type {string}
   * @memberof FilterConfig
   */
  color: string;
}
