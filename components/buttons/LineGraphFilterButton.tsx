//types
import { LineGraphFilterButtonProps } from "@/features/projected-net-worth/types/filters";
import { DialogClose } from "@/components/ui/dialog";

const LineGraphFilterButton = ({
  label,
  isSelected,
  color,
  onClick,
}: LineGraphFilterButtonProps) => {
  return (
    <DialogClose
      onClick={onClick}
      className={`px-1 gap-3 hover:bg-tertiary-200 transition duration-300 py-[0.7rem]  rounded-[12px] text-xs hover:text-tertiary-1000 hover:border-tertiary-200  flex flex-row justify-center items-center text-center border ${
      isSelected
        ? ` text-tertiary-1000 font-extrabold border-tertiary-500 bg-tertiary-200`
        : "text-tertiary-800 border-tertiary-300"
      }`}
    >
      <span
      style={{ backgroundColor: color }}
      className={`w-[0.8rem] h-[0.23rem] rounded-full`}
      ></span>
      {label}
    </DialogClose>
  );
};

export default LineGraphFilterButton;
