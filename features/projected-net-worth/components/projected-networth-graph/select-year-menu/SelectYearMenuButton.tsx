import React from "react";

//UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//Functions
import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";

//Components
import SelectYearMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenu";

interface PrimaryYearMenuProps {
  years: number[];
  retirementYear: number;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  editRetirementYear: (year: number) => void;
}

const SelectYearMenuButton = ({
  years,
  retirementYear,
  selectedYear,
  setSelectedYear,
  editRetirementYear,
}: PrimaryYearMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-normal outline-none flex items-center justify-center gap-2 transition duration-500 ease-in-out border border-transparent border-tertiary-500 rounded-[6px]  px-2 py-[0.2rem] hover:bg-tertiary-100 hover:border-tertiary-1000 text-tertiary-900 text-[1.2rem]">
        {selectedYear}
        {GetSvgV2({
          path: "m19.5 8.25-7.5 7.5-7.5-7.5",
          strokeWidth: 2,
          size: "size-4",
        })}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="backdrop-blur bg-tertiary-300/40"
      >
        <SelectYearMenu
          years={years}
          retirementYear={retirementYear}
          setSelectedYear={setSelectedYear}
          setRetirementYear={editRetirementYear}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectYearMenuButton;
