import React, { useState } from "react";

//Functions
import { getYearRanges } from "@/utils/helper-functions/getYearRanges";

//Components
import RetirementYearSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/retirement-year/RetirementYearSectionMenu";
import BeforeRetirementSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/before-retirement/BeforeRetirementSectionMenu";
import AfterRetirementSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/after-retirement/AfterRetirementSectionMenu";

//Types
import { GroupedDateSelectorProps } from "@/features/projected-net-worth/types/selectYearMenu";

/**
 * Component for selecting a year from a list of years, categorized into
 * before and after retirement years. It also allows editing the retirement year.
 *
 * @param {Object} props - The component props.
 * @param {number[]} props.years - Array of years to select from.
 * @param {number} props.retirementYear - The year of retirement.
 * @param {Function} props.setSelectedYear - Function to set the selected year.
 * @param {Function} props.setRetirementYear - Function to set the retirement year.
 *
 * @returns {JSX.Element} The SelectYearMenu component.
 */
const SelectYearMenu = ({
  years = [],
  retirementYear = new Date().getFullYear(),
  setSelectedYear = () => {},
  setRetirementYear = () => {},
}: GroupedDateSelectorProps): JSX.Element => {
  const [showBeforeRetirement, setShowBeforeRetirement] = useState(true);
  const [showAfterRetirement, setShowAfterRetirement] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const beforeRetirementYears = years.filter(
    (year: number) => year < retirementYear
  );
  const afterRetirementYears = years.filter(
    (year: number) => year > retirementYear
  );

  const editRetirementYear = () => setShowYearSelector(!showYearSelector);

  const beforeRetirementRanges = getYearRanges(
    beforeRetirementYears,
    10,
    retirementYear
  );

  return (
    <div className="w-[20rem] h-[28rem] py-4 px-6 overflow-scroll">
      <RetirementYearSectionMenu
        retirementYear={retirementYear}
        selectYear={() => setSelectedYear(retirementYear)}
        editRetirementYear={editRetirementYear}
        selectRetirementYear={setRetirementYear}
        showYearSelector={showYearSelector}
        years={years}
      />
      <BeforeRetirementSectionMenu
        beforeRetirementRanges={beforeRetirementRanges}
        setSelectedYear={setSelectedYear}
        headerFn={() => setShowBeforeRetirement(!showBeforeRetirement)}
        showBeforeRetirement={showBeforeRetirement}
      />
      <AfterRetirementSectionMenu
        afterRetirementYears={afterRetirementYears}
        showAfterRetirement={showAfterRetirement}
        headerFn={() => setShowAfterRetirement(!showAfterRetirement)}
        setSelectedYear={setSelectedYear}
      />
    </div>
  );
};

export default SelectYearMenu;
