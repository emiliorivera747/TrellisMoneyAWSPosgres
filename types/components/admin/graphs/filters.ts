import { AccountGraphFilter } from "@/features/accounts/types/graph";

/**
 * Represents the configuration for a graph filter.
 * @export
 * @interface GraphFilterConfig
 */
export interface GraphFilterConfig {
  /**
   * The key of the filter.
   * @type {AccountGraphFilter}
   * @memberof GraphFilterConfig
   */
  key: AccountGraphFilter;
  /**
   * The label of the filter.
   * @type {string}
   * @memberof GraphFilterConfig
   */
  label: string;
  /**
   * The SVG path of the filter.
   * @type {string}
   * @memberof GraphFilterConfig
   */
  svgPath: string;
  /**
   * The color of the filter.
   * @type {string}
   * @memberof GraphFilterConfig
   */
  color: string;
}

/**
 * Represents the properties for line graph filter buttons.
 * @export
 * @interface LineGraphFilterButtonsProps
 */
export interface LineGraphFilterButtonsProps {
  /**
   * Configuration for the filter.
   * @type {GraphFilterConfig[]}
   * @memberof LineGraphFilterButtonsProps
   */
  filterConfig: GraphFilterConfig[];

  /**
   * The ref of the filter.
   * @type {React.Ref<HTMLDivElement>}
   * @memberof LineGraphFilterButtonsProps
   */
  ref?: React.Ref<HTMLDivElement>;

  /**
   * The class name of the filter.
   * @type {string}
   * @memberof LineGraphFilterButtonsProps
   */
  className?: string;
}

/**
 * Represents the properties for a graph filter button with modal.
 * @export
 * @interface GraphFilterButtonWithModalProps
 */
export interface GraphFilterButtonWithModalProps {
  /**
   * Configuration for the filter.
   * @type {GraphFilterConfig[]}
   * @memberof GraphFilterButtonWithModalProps
   */
  filterConfig: GraphFilterConfig[];

  /**
   * The ref of the filter.
   * @type {React.Ref<HTMLDivElement>}
   * @memberof GraphFilterButtonWithModalProps
   */
  ref?: React.Ref<HTMLDivElement>;

  /**
   * The class name of the filter.
   * @type {string}
   * @memberof GraphFilterButtonWithModalProps
   */
  className?: string;
}

/**
 * Represents the configuration for a date filter.
 * @export
 * @interface DateFilterConfig
 */
export interface DateFilterConfig {
  /**
   * The label of the date filter.
   * @type {string}
   * @memberof DateFilterConfig
   */
  label: string;

  /**
   * The value of the date filter.
   * @type {string}
   * @memberof DateFilterConfig
   */
  value: string;

  /**
   * The start date of the date filter.
   * @type {Date}
   * @memberof DateFilterConfig
   */
  startData: Date;

  /**
   * The end date of the date filter.
   * @type {Date}
   * @memberof DateFilterConfig
   */
  endData: Date;
}

/**
 * Represents the properties for a date filter component.
 * @export
 * @interface DateFilterProps
 */
export interface DateFilterProps {
  /**
   * The data filter configuration.
   * @type {DateFilterConfig[]}
   * @memberof DateFilterProps
   */
  dateFilter: DateFilterConfig[];

  /**
   * The function to handle the date filter change.
   * @type {(startData: Date, endDate: Date) => void}
   * @memberof DateFilterProps
   */
  handleDateFilterChange: (startData: Date, endDate: Date) => void;
}
