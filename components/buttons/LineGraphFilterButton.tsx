import React from "react";

interface LineGraphFilterButtonProps {
  label: string;
  isSelected: boolean;
  svg_path?: string;
  color?: string;
}

const LineGraphFilterButton = ({
  label,
  isSelected,
  svg_path,
  color,
}: LineGraphFilterButtonProps) => {
  return (
    <button
      className={`transition duration-300 p-1 px-2 rounded-[12px] text-xs hover:text-tertiary-800 hover:border-tertiary-700 hover:font-bold border-none flex flex-row justify-start items-center text-center gap-2 ${
        isSelected
          ? ` text-tertiary-1000 font-extrabold border-tertiary-300`
          : "text-tertiary-800 border-tertiary-400 "
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={svg_path} />
      </svg>
      {label}
    </button>
  );
};

export default LineGraphFilterButton;
