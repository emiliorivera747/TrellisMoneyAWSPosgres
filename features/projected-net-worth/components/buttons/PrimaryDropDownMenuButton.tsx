import React from "react";

interface PrimaryDropDownMenuButtonProps {
  actionFn: () => void;
  year: number;
}

const PrimaryDropDownMenuButton = ({
  actionFn,
  year,
}: PrimaryDropDownMenuButtonProps) => {
  if (typeof actionFn !== "function") return null;

  if (typeof year !== "number" || isNaN(year)) return null;

  return (
    <button
      className={
        "border-tertiary-500 font-semibold text-xs text-tertiary-800 border rounded-[12px] hover:bg-primary-800 hover:text-white hover:border-transparent hover:font-semibold transition duration-600 ease-in-out py-[0.6rem]"
      }
      onClick={actionFn}
    >
      {year}
    </button>
  );
};

export default PrimaryDropDownMenuButton;
