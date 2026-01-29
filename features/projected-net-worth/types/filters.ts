/**
 * Represents the available inflation filter options.
 * @export
 * @typedef {"inflationAdjusted" | "actual" | "both"} InflationFilters
 */
export type InflationFilters = "inflationAdjusted" | "actual" | "both";

/**
 * Properties for the line graph filter buttons component.
 * @export
 * @interface LineGraphFilterButtonsProps
 */
export interface LineGraphFilterButtonsProps<T> {
  /**
   * The currently selected filter.
   * @type {T}
   * @memberof LineGraphFilterButtonsProps
   */
  selectedFilter: T;

  /**
   * Function to handle filter changes.
   * @type {(key: T) => void}
   * @memberof LineGraphFilterButtonsProps
   */
  handleFilterChange: (key: T) => void;

  /**
   * Configuration for the filter buttons.
   * @type {Array<{ key: T; label: string; svgPath: string; color: string }>}
   * @memberof LineGraphFilterButtonsProps
   */
  filterConfigs: Array<{
    key: T;
    label: string;
    svgPath: string;
    color: string;
  }>;
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
  svgPath?: string;

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
  svgPath: string;

  /**
   * Color for the filter.
   * @type {string}
   * @memberof FilterConfig
   */
  color: string;
}
