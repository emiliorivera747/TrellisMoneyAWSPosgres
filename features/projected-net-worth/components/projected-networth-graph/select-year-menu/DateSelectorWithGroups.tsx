import React, { useState } from "react";

//Functions
import {
  cheveronUp,
  cheveronDown,
} from "@/utils/helper-functions/getCheverons";
import { getYearRanges } from "@/utils/helper-functions/getYearRanges";

//Components
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/HeaderWithIcon";
import ListOfYears from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/ListOfYears";
import RetirementYearSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/RetirementYearSectionMenu";
import BeforeRetirementSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/BeforeRetirementSectionMenu";
import AfterRetirementSectionMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/AfterRetirementSectionMenu";

//Types
import { GroupedDateSelectorProps } from "@/types/dashboardComponents";
import { RetirementYearInput} from "@/features/projected-net-worth/schema/ProjectedNetWorthGraphSchemas";

const DateSelectorWithGroups = ({
  years,
  register,
  errors,
  retirementYear,
  setSelectedYear,
  setRetirementYear,
}: GroupedDateSelectorProps<RetirementYearInput>) => {

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
    <div className="w-[50rem] h-[28rem] py-6 px-10 overflow-scroll ">
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

export default DateSelectorWithGroups;
