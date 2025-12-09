
import React from "react";
import { YearSelectorProps } from "@/features/projected-net-worth/types/selectYearMenu";


/**
 * YearSelector component allows users to select a year from a dropdown menu.
 * 
 * @param {Object} props - The properties object.
 * @param {number[]} props.years - An array of years to display in the dropdown.
 * @param {number} props.selectedYear - The currently selected year.
 * @param {Function} props.setSelectedYear - Function to update the selected year.
 * 
 * @returns {React.ReactNode} A dropdown menu for selecting a year.
 */
const YearSelector = ({
  years,
  selectedYear,
  setSelectedYear,
}: YearSelectorProps): React.ReactNode => {
  if (!years || years.length === 0) return <p>Years not available. Please try again later</p>;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (typeof setSelectedYear === 'function') {
      setSelectedYear(Number(e.target.value));
    }
  };

  return (
    <select
      className="pointer year-selector rounded-[12px] border-2 border-tertiary-400 text-xs flex items-center justify-center p-[0.6rem] font-semibold text-tertiary-800 bg-tertiary-400 hover:border-primary-400 hover:cursor-pointer focus:outline-none focus:border-primary-400 text-center"
      onChange={handleChange}
      value={selectedYear}
    >
      {years.map((year: number) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
