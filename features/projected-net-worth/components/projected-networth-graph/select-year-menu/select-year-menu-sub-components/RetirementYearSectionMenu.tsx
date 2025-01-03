import React, { useState } from "react";
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/HeaderWithIcon";
import PrimaryDropDownMenuButton from "@/features/projected-net-worth/components/buttons/PrimaryDropDownMenuButton";
import { RetirementYearSectionMenuProps } from "@/types/dashboardComponents";
import { getPencilSvg } from "@/utils/helper-functions/getPencilSvg";

// Components
import YearSelector from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/YearSelector";

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
        toolTipLabel="Edit"
      />
      <h2 className="text-tertiary-800 text-[0.8rem] mb-2">
        You are set to retire in {retirementYear - years[0]} years
      </h2>

      <div
        className={`grid grid-cols-1 gap-y-2  transition-all duration-1000 ease-in-out ${
          showYearSelector ? "opacity-0 h-0" : "opacity-100 h-auto"
        }`}
        style={{ transitionProperty: "opacity, height" }}
      >
        {!showYearSelector && (
            <button className="border-tertiary-500 font-semibold text-xs text-tertiary-800 border rounded-[12px] hover:bg-primary-800 hover:text-white hover:border-transparent hover:font-semibold transition duration-600 ease-in-out py-[0.6rem] ">{retirementYear}</button>
          // <PrimaryDropDownMenuButton
          //   actionFn={selectYear}
          //   year={retirementYear}
          // />
        )}
      </div>

      <div
        className={`grid grid-cols-1 gap-x-4 gap-y-2 transition-all duration-1000 ease-in-out ${
          showYearSelector ? "opacity-100 h-auto" : "opacity-0 h-0"
        }`}
        style={{ transitionProperty: "opacity, height" }}
      >
        {showYearSelector && (
          <>
            <YearSelector
              years={years}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
            <button
              type="button"
              className="bg-primary-800 text-white col-span-1 rounded-[12px] py-[0.6rem] px-[1rem] font-semibold text-xs hover:bg-primary-900 transition duration-600 ease-in-out "
              onClick={() => selectRetirementYear(selectedYear)}
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RetirementYearSectionMenu;
