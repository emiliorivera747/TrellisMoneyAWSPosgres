import React from "react";
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/headers/HeaderWithIcon";
import {
  cheveronUp,
  cheveronDown,
} from "@/utils/helper-functions/getCheverons";
import ListOfYearsGroupedByRange from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/list/ListOfYearsGroupedByRange";
import { BeforeRetirementSectionMenuProps } from "@/features/projected-net-worth/types/selectYearMenu";


/**
 * Component for rendering the "Before Retirement" section menu.
 *
 * @param {Object} props - The props for the component.
 * @param {boolean} props.showBeforeRetirement - Flag to show or hide the list of years before retirement.
 * @param {Function} props.headerFn - Function to be called when the header is clicked.
 * @param {Function} props.setSelectedYear - Function to set the selected year.
 * @param {Array} props.beforeRetirementRanges - Array of year ranges before retirement.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <BeforeRetirementSectionMenu
 *   showBeforeRetirement={true}
 *   headerFn={handleHeaderClick}
 *   setSelectedYear={handleYearSelection}
 *   beforeRetirementRanges={yearRanges}
 * />
 */
const BeforeRetirementSectionMenu = ({
  showBeforeRetirement,
  headerFn,
  setSelectedYear,
  beforeRetirementRanges,
}: BeforeRetirementSectionMenuProps): JSX.Element => {

  // Ensure required props are provided
  if (!headerFn || !setSelectedYear || !beforeRetirementRanges) {
    console.error("Missing required props in BeforeRetirementSectionMenu");
    return <></>;
  }

  return (
    <div className="mb-6 transition-all duration-1000 ease-in-out">
      {/* Header with icon to toggle the visibility of the list */}
      <HeaderWithIcon
        actionFunction={headerFn}
        label="Before Retirement"
        icon={showBeforeRetirement ? cheveronUp() : cheveronDown()}
        toolTipLabel={showBeforeRetirement ? "Hide years" : "View years"}
      />
      {/* Conditionally render the list of years if showBeforeRetirement is true */}
      {showBeforeRetirement && (
        <ListOfYearsGroupedByRange
          beforeRetirementRanges={beforeRetirementRanges}
          actionFn={setSelectedYear}
        />
      )}
    </div>
  );
};

export default BeforeRetirementSectionMenu;
