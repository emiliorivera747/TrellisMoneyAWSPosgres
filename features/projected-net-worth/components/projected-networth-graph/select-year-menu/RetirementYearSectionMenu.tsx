import React, { useState } from "react";
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/HeaderWithIcon";
import PrimaryDropDownMenuButton from "@/features/projected-net-worth/components/buttons/PrimaryDropDownMenuButton";
import { RetirementYearSectionMenuProps } from "@/types/dashboardComponents";
import { getPencilSvg } from "@/utils/helper-functions/getPencilSvg";

// Components
import YearSelector from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/YearSelector";

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
      />
      {!showYearSelector && (
        <div className="grid grid-cols-3 gap-2">
          <PrimaryDropDownMenuButton
            actionFn={selectYear}
            year={retirementYear}
          />
        </div>
      )}
      {showYearSelector && (
        <div className="grid grid-cols-3">
          <YearSelector
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <button
            type="button"
            className="bg-primary-800 text-white grid-column-start-1 col-span-1 rounded-[12px] py-[0.6rem] px-[1rem] font-semibold text-xs hover:bg-primary-900 transition duration-600 ease-in-out"
            onClick={() => selectRetirementYear(selectedYear)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default RetirementYearSectionMenu;
