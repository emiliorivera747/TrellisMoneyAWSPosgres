/**
 * Properties for the grouped date selector component.
 * @export
 * @interface GroupedDateSelectorProps
 */
export interface GroupedDateSelectorProps {
  /**
   * Array of years to display.
   * @type {number[]}
   * @memberof GroupedDateSelectorProps
   */
  years: number[];

  /**
   * The retirement year.
   * @type {number}
   * @memberof GroupedDateSelectorProps
   */
  retirementYear: number;

  /**
   * Function to set the selected year.
   * @type {(year: number) => void}
   * @memberof GroupedDateSelectorProps
   */
  setSelectedYear: (year: number) => void;

  /**
   * Function to set the retirement year.
   * @type {(year: number) => void}
   * @memberof GroupedDateSelectorProps
   */
  setRetirementYear: (year: number) => void;
}

/**
 * Properties for the retirement year section menu component.
 * @export
 * @interface RetirementYearSectionMenuProps
 */
export interface RetirementYearSectionMenuProps {
  /**
   * The retirement year.
   * @type {number}
   * @memberof RetirementYearSectionMenuProps
   */
  retirementYear: number;

  /**
   * Function to select a year.
   * @type {() => void}
   * @memberof RetirementYearSectionMenuProps
   */
  selectYear: () => void;

  /**
   * Function to edit the retirement year.
   * @type {() => void}
   * @memberof RetirementYearSectionMenuProps
   */
  editRetirementYear: () => void;

  /**
   * Function to select a specific retirement year.
   * @type {(year: number) => void}
   * @memberof RetirementYearSectionMenuProps
   */
  selectRetirementYear: (year: number) => void;

  /**
   * Whether the year selector is visible.
   * @type {boolean}
   * @memberof RetirementYearSectionMenuProps
   */
  showYearSelector: boolean;

  /**
   * Array of years to display.
   * @type {number[]}
   * @memberof RetirementYearSectionMenuProps
   */
  years: number[];
}

/**
 * Properties for the after retirement section menu component.
 * @export
 * @interface AfterRetirementSectionMenuProps
 */
export interface AfterRetirementSectionMenuProps {
  /**
   * Array of years after retirement.
   * @type {number[]}
   * @memberof AfterRetirementSectionMenuProps
   */
  afterRetirementYears: number[];

  /**
   * Function to set the selected year.
   * @type {(year: number) => void}
   * @memberof AfterRetirementSectionMenuProps
   */
  setSelectedYear: (year: number) => void;

  /**
   * Whether to show after retirement section.
   * @type {boolean}
   * @memberof AfterRetirementSectionMenuProps
   */
  showAfterRetirement: boolean;

  /**
   * Function to handle header actions.
   * @type {() => void}
   * @memberof AfterRetirementSectionMenuProps
   */
  headerFn: () => void;
}

/**
 * Properties for the before retirement section menu component.
 * @export
 * @interface BeforeRetirementSectionMenuProps
 */
export interface BeforeRetirementSectionMenuProps {
  /**
   * Object mapping range names to arrays of years before retirement.
   * @type {Record<string, number[]>}
   * @memberof BeforeRetirementSectionMenuProps
   */
  beforeRetirementRanges: Record<string, number[]>;

  /**
   * Function to set the selected year.
   * @type {(year: number) => void}
   * @memberof BeforeRetirementSectionMenuProps
   */
  setSelectedYear: (year: number) => void;

  /**
   * Function to handle header actions.
   * @type {() => void}
   * @memberof BeforeRetirementSectionMenuProps
   */
  headerFn: () => void;

  /**
   * Whether to show before retirement section.
   * @type {boolean}
   * @memberof BeforeRetirementSectionMenuProps
   */
  showBeforeRetirement: boolean;
}

/**
 * Properties for the year selector component.
 * @export
 * @interface YearSelectorProps
 */
export interface YearSelectorProps {
  /**
   * Array of years to display.
   * @type {number[]}
   * @memberof YearSelectorProps
   */
  years: number[];

  /**
   * The currently selected year.
   * @type {number}
   * @memberof YearSelectorProps
   */
  selectedYear: number;

  /**
   * Function to set the selected year.
   * @type {(year: number) => void}
   * @memberof YearSelectorProps
   */
  setSelectedYear: (year: number) => void;
}

/**
 * Properties for displaying a list of years.
 * @export
 * @interface ListOfYearsProps
 */
export interface ListOfYearsProps {
  /**
   * Array of years to display.
   * @type {number[]}
   * @memberof ListOfYearsProps
   */
  years: number[];

  /**
   * Function to execute when a year is selected.
   * @type {(year: number) => void}
   * @memberof ListOfYearsProps
   */
  actionFn: (year: number) => void;
}

/**
 * Properties for displaying a list of years grouped by range.
 * @export
 * @interface ListOfYearsGroupedByRangeProps
 */
export interface ListOfYearsGroupedByRangeProps {
  /**
   * Function to execute when a year is selected.
   * @type {(year: number) => void}
   * @memberof ListOfYearsGroupedByRangeProps
   */
  actionFn: (year: number) => void;

  /**
   * Object mapping range names to arrays of years before retirement.
   * @type {Record<string, number[]>}
   * @memberof ListOfYearsGroupedByRangeProps
   */
  beforeRetirementRanges: Record<string, number[]>;
}

/**
 * Properties for rendering the primary dropdown menu button.
 * @export
 * @interface renderPrimaryDropDownMenuButtonProps
 */
export interface renderPrimaryDropDownMenuButtonProps {
  /**
   * Whether the year selector is visible.
   * @type {boolean}
   * @memberof renderPrimaryDropDownMenuButtonProps
   */
  showYearSelector: boolean;

  /**
   * Function to select a year.
   * @type {() => void}
   * @memberof renderPrimaryDropDownMenuButtonProps
   */
  selectYear: () => void;

  /**
   * The retirement year.
   * @type {number}
   * @memberof renderPrimaryDropDownMenuButtonProps
   */
  retirementYear: number;
}

/**
 * Properties for rendering the year selector.
 * @export
 * @interface renderYearSelectorProps
 */
export interface renderYearSelectorProps {
  /**
   * Whether the year selector is visible.
   * @type {boolean}
   * @memberof renderYearSelectorProps
   */
  showYearSelector: boolean;

  /**
   * Array of years to display.
   * @type {number[]}
   * @memberof renderYearSelectorProps
   */
  years: number[];

  /**
   * The currently selected year.
   * @type {number}
   * @memberof renderYearSelectorProps
   */
  selectedYear: number;

  /**
   * Function to set the selected year.
   * @type {(year: number) => void}
   * @memberof renderYearSelectorProps
   */
  setSelectedYear: (year: number) => void;

  /**
   * Function to select a specific retirement year.
   * @type {(year: number) => void}
   * @memberof renderYearSelectorProps
   */
  selectRetirementYear: (year: number) => void;
}
