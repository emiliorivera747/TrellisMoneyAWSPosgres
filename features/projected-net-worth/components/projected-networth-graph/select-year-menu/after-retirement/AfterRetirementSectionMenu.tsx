import React from "react";

// Components
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/headers/HeaderWithIcon";
import ListOfYears from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/list/ListOfYears";

//Icons
import {
  cheveronUp,
  cheveronDown,
} from "@/utils/helper-functions/getCheverons";

import { AfterRetirementSectionMenuProps } from "@/features/projected-net-worth/types/selectYearMenu";

/**
 * Component for displaying a section menu for after retirement years.
 *
 * @param {AfterRetirementSectionMenuProps} props - The properties for the component.
 * @param {number[]} props.afterRetirementYears - An array of years after retirement.
 * @param {boolean} props.showAfterRetirement - A flag indicating whether to show the after retirement section.
 * @param {() => void} props.headerFn - A function to be called when the header is clicked.
 * @param {(year: number) => void} props.setSelectedYear - A function to set the selected year.
 *
 * @returns {React.ReactNode} The rendered component.
 */
const AfterRetirementSectionMenu = ({
  afterRetirementYears,
  showAfterRetirement,
  headerFn,
  setSelectedYear,
}: AfterRetirementSectionMenuProps): React.ReactNode => {
  return (
    <div className="mb-6">
      <HeaderWithIcon
        actionFunction={headerFn}
        label="After Retirement"
        icon={showAfterRetirement ? cheveronUp() : cheveronDown()}
        toolTipLabel={showAfterRetirement ? "Hide years" : "View years"}
      />
      {showAfterRetirement && (
        <div className="grid grid-cols-1 gap-2">
          <ListOfYears
            years={afterRetirementYears}
            actionFn={setSelectedYear}
          />
        </div>
      )}
    </div>
  );
};

export default AfterRetirementSectionMenu;
