import React from "react";
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/HeaderWithIcon";
import {
  cheveronUp,
  cheveronDown,
} from "@/utils/helper-functions/getCheverons";
import ListOfYearsGroupedByRange from "@/features/projected-net-worth/components/projected-networth-graph/ListOfYearsGroupedByRange";

interface BeforeRetirementSectionMenuProps {
  beforeRetirementRanges: Record<string, number[]>;
  setSelectedYear: (year: number) => void;
  headerFn: () => void;
  showBeforeRetirement: boolean;
}

const BeforeRetirementSectionMenu = ({
  showBeforeRetirement,
  headerFn,
  setSelectedYear,
  beforeRetirementRanges,
}: BeforeRetirementSectionMenuProps) => {
  return (
    <div className="mb-6">
      <HeaderWithIcon
        actionFunction={headerFn}
        label="Before Retirement"
        icon={showBeforeRetirement ? cheveronUp() : cheveronDown()}
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
