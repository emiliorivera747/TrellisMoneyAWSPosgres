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
      className=" bg-tertiary-500 border-tertiary-500 font-semibold text-xs text-tertiary-800 border rounded-[12px] hover:bg-primary-800 hover:text-white hover:border-transparent hover:font-semibold transition duration-600 ease-in-out py-[0.6rem]p"
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
