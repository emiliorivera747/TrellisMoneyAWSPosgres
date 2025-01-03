import React, { useState } from "react";

//Functions
import { getYearRanges } from "@/utils/helper-functions/getYearRanges";

//Components
import RetirementYearSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/retirement-year/RetirementYearSectionMenu";
import BeforeRetirementSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/before-retirement/BeforeRetirementSectionMenu";
import AfterRetirementSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/after-retirement/AfterRetirementSectionMenu";

//Types
import {GroupedDateSelectorProps} from "@/features/projected-net-worth/types/graphComponents";

const SelectYearMenu = ({
  years,
  retirementYear,
  setSelectedYear,
  setRetirementYear,
}: GroupedDateSelectorProps) => {

  const [showBeforeRetirement, setShowBeforeRetirement] = useState(true);
  const [showAfterRetirement, setShowAfterRetirement] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const beforeRetirementYears = years.filter((year) => year < retirementYear);
  const afterRetirementYears = years.filter((year) => year > retirementYear);
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
