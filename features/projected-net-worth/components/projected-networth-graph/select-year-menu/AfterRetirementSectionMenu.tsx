import React from "react";
import HeaderWithIcon from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/HeaderWithIcon";
import {
  cheveronUp,
  cheveronDown,
} from "@/utils/helper-functions/getCheverons";

import ListOfYears from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/ListOfYears";

interface AfterRetirementSectionMenuProps {
  afterRetirementYears: number[];
  setSelectedYear: (year: number) => void;
  showAfterRetirement: boolean;
  headerFn: () => void;
}

const AfterRetirementSectionMenu = ({
  afterRetirementYears,
  showAfterRetirement,
  headerFn,
  setSelectedYear,
}: AfterRetirementSectionMenuProps) => {
  return (
    <div className="mb-6">
      <HeaderWithIcon
        actionFunction={headerFn}
        label="After Retirement"
        icon={showAfterRetirement ? cheveronUp() : cheveronDown()}
      />
      {showAfterRetirement && (
        <div className="grid grid-cols-6 gap-2">
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
