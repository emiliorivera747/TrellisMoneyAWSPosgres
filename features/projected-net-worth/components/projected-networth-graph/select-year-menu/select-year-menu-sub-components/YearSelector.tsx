import React from "react";
import { YearSelectorProps } from "@/types/dashboardComponents";

const YearSelector = ({
  years,
  selectedYear,
  setSelectedYear,
}: YearSelectorProps) => {
  if (!years || years.length === 0) return <p>No years available</p>;

  return (
    <select
      className="pointer year-selector rounded-[12px] border-2 border-tertiary-400 text-xs flex items-center justify-center p-[0.6rem] font-semibold text-teritary-800 bg-tertiary-400 hover:border-primary-400 hover:cursor-pointr focus:outline-none focus:border-primary-400 text-center"
      onChange={(e) => setSelectedYear(Number(e.target.value))}
      value={selectedYear}
    >
      {years.map((year) => (
      <option key={year} value={year}>
      {year}
      </option>
      ))}
    </select>
  );
};

export default YearSelector;
