import React from "react";
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/HeaderWithIcon";
import {
  cheveronUp,
  cheveronDown,
} from "@/utils/helper-functions/getCheverons";
import ListOfYearsGroupedByRange from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/ListOfYearsGroupedByRange";
import { BeforeRetirementSectionMenuProps } from "@/features/projected-net-worth/types/graphComponents";

const BeforeRetirementSectionMenu = ({
  showBeforeRetirement,
  headerFn,
  setSelectedYear,
  beforeRetirementRanges,
}: BeforeRetirementSectionMenuProps) => {
  return (
    <div className="mb-6 transition-all duration-1000 ease-in-out">
      <HeaderWithIcon
        actionFunction={headerFn}
        label="Before Retirement"
        icon={showBeforeRetirement ? cheveronUp() : cheveronDown()}
        toolTipLabel={showBeforeRetirement ? "Collapse" : "Expand"}
      />
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
