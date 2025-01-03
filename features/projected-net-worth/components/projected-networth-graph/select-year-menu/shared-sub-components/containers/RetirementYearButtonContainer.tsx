import React from "react";
import { renderPrimaryDropDownMenuButtonProps } from "@/features/projected-net-worth/types/graphComponents";
import PrimaryMenuButton from "@/components/buttons/PrimaryMenuButtons";

/**
 * 
 * The container responsible for rendering the retirement year button
 * 
 * @param param0 
 * @returns container with the retirement year button
 */
const RetirementYearButtonContainer = ({
  showYearSelector,
  selectYear,
  retirementYear,
}: renderPrimaryDropDownMenuButtonProps) => {
  return (
    <div
      className={`grid grid-cols-1 gap-y-2  transition-all duration-1000 ease-in-out ${
        showYearSelector ? "opacity-0 h-0" : "opacity-100 h-auto"
      }`}
    >
      {!showYearSelector && (
        <PrimaryMenuButton
          actionFn={selectYear}
          label={retirementYear}
        />
      )}
    </div>
  );
};

export default RetirementYearButtonContainer;
