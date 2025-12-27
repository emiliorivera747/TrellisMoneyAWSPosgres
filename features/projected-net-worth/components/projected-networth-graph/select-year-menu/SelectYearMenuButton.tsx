//UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//Functions
import { GetSvgV2 } from "@/utils/helper-functions/svg/GetSvgV2";

//Components
import SelectYearMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenu";

interface PrimaryYearMenuProps {
  years: number[];
  retirementYear: number;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  editRetirementYear: (year: number) => void;
}

/**
 * Select Year menu button
 *
 */
const SelectYearMenuButton = ({
  years,
  retirementYear,
  selectedYear,
  setSelectedYear,
  editRetirementYear,
}: PrimaryYearMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex items-center justify-center gap-2 transition duration-500 ease-in-out border  px-3  hover:bg-tertiary-100 text-tertiary-900 text-[1rem] border-tertiary-200 font-light rounded-[12px] py-1">
        {selectedYear}
        {GetSvgV2({
          path: "m19.5 8.25-7.5 7.5-7.5-7.5",
          strokeWidth: 2,
          size: "size-3",
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
