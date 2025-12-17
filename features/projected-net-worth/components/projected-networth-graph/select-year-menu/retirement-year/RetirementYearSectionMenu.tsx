//React
import React, { useState } from "react";

// Icons
import { getPencilSvg } from "@/utils/helper-functions/svg/getPencilSvg";

// Components
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/headers/HeaderWithIcon";
import SubHeader from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/headers/SubHeader";
import YearSelectorContainer from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/containers/YearSelectorContainer";
import RetirementYearButtonContainer from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/containers/RetirementYearButtonContainer";
import { RetirementYearSectionMenuProps } from "@/features/projected-net-worth/types/selectYearMenu";

/**
 * Calculates total years until retirement
 *
 * @param years
 * @param retirementYear
 * @returns
 */
const getYearsToRetire = (years: number[], retirementYear: number) => {
  if (!years || years.length === 0 || !retirementYear) {
    return 0;
  }
  return retirementYear - years[0];
};

/**
 *
 * Section for selecting or updating the retirement year within the select year menu
 *
 *
 * @returns retirement year section for the select year menu
 */
const RetirementYearSectionMenu = ({
  retirementYear,
  editRetirementYear,
  selectYear,
  selectRetirementYear,
  showYearSelector,
  years,
}: RetirementYearSectionMenuProps) => {
  const [selectedYear, setSelectedYear] = useState(retirementYear);

  return (
    <div className="mb-6">

      <HeaderWithIcon
        actionFunction={editRetirementYear}
        label="Retirement Year"
        icon={getPencilSvg}
        toolTipLabel="Edit retirement year"
      />

      <SubHeader
        label={` You are set to retire in ${getYearsToRetire(
          years,
          retirementYear
        )} years`}
      />

      {/* Displays retirment year button */}
      <RetirementYearButtonContainer
        showYearSelector={showYearSelector}
        selectYear={selectYear}
        retirementYear={retirementYear}
      />

      <YearSelectorContainer
        showYearSelector={showYearSelector}
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectRetirementYear={selectRetirementYear}
      />
    </div>
  );
};

export default RetirementYearSectionMenu;
