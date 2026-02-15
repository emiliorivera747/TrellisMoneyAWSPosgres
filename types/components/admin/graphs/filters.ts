
export interface GraphFilterConfig<T> {
  /**
   * The key of the filter.
   * @type {T}
   * @memberof GraphFilterConfig
   */
  key: T;
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
  filterConfig: GraphFilterConfig<any>[];

  /**
   * The ref of the filter.
   * @type {React.Ref<HTMLDivElement>}
   * @memberof LineGraphFilterButtonsProps
   */
  innerRef?: React.Ref<HTMLDivElement>;

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
  filterConfig: GraphFilterConfig<any>[];

  /**
   * The ref of the filter.
   * @type {React.Ref<HTMLDivElement>}
   * @memberof GraphFilterButtonWithModalProps
   */
  innerRef?: React.Ref<HTMLDivElement>;

  /**
   * The class name of the filter.
   * @type {string}
   * @memberof GraphFilterButtonWithModalProps
   */
  className?: string;

  label?: string;
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

export interface GraphFilterButtonWithDialogProps<T> {
  handleFilterChange: (filter: T) => void;
  selectedFilter: T;
  label?: string;
  filterConfig: Array<{
    key: T;
    label: string;
    svgPath: string;
    color: string;
  }>;
}
