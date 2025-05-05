export interface GroupedDateSelectorProps {
  years: number[];
  retirementYear: number;
  setSelectedYear: (year: number) => void;
  setRetirementYear: (year: number) => void;
}

export interface RetirementYearSectionMenuProps {
  retirementYear: number;
  selectYear: () => void;
  editRetirementYear: () => void;
  selectRetirementYear: (year: number) => void;
  showYearSelector: boolean;
  years: number[];
}

export interface AfterRetirementSectionMenuProps {
  afterRetirementYears: number[];
  setSelectedYear: (year: number) => void;
  showAfterRetirement: boolean;
  headerFn: () => void;
}

export interface BeforeRetirementSectionMenuProps {
  beforeRetirementRanges: Record<string, number[]>;
  setSelectedYear: (year: number) => void;
  headerFn: () => void;
  showBeforeRetirement: boolean;
}

export interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export interface ListOfYearsProps {
  years: number[];
  actionFn: (year: number) => void;
}

export interface ListOfYearsGroupedByRangeProps {
  actionFn: (year: number) => void;
  beforeRetirementRanges: Record<string, number[]>;
}
export interface renderPrimaryDropDownMenuButtonProps {
  showYearSelector: boolean;
  selectYear: () => void;
  retirementYear: number;
}

export interface renderYearSelectorProps {
  showYearSelector: boolean;
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectRetirementYear: (year: number) => void;
}
