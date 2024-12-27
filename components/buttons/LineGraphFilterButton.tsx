import React from "react";

interface LineGraphFilterButtonProps {
  label: string;
  icon: React.ReactNode;
}

const LineGraphFilterButton = ({ label, icon }: LineGraphFilterButtonProps) => {
  return (
    <button className="p-1 px-2 text-tertiary-700 rounded-[12px] text-xs hover:text-tertiary-800 hover:border-tertiary-800 hover:font-bold border border-tertiary-200 flex flex-row justify-center items-center gap-2">
      {icon}
      {label}
    </button>
  );
};

export default LineGraphFilterButton;
