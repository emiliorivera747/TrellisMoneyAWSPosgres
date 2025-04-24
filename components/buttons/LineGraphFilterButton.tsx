import React from "react";

//types
import {LineGraphFilterButtonProps} from '@/features/projected-net-worth/types/filters'

const LineGraphFilterButton = ({
  label,
  isSelected,
  svg_path,
  color ,
  onClick,
}: LineGraphFilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-tertiary-200 transition duration-300 py-[0.7rem]  rounded-[12px] text-xs hover:text-tertiary-1000 hover:border-tertiary-200   flex flex-row justify-center items-center text-center gap-2 border ${
        isSelected
          ? ` text-tertiary-1000 font-extrabold border-tertiary-500 bg-tertiary-200`
          : "text-tertiary-800 border-tertiary-300 "
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color ? color : "currentColor"}
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={svg_path} />
      </svg>
      {label}
    </button>
  );
};

export default LineGraphFilterButton;
