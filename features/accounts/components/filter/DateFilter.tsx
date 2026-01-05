import React from "react";
import LineGraphTimeButton from "@/components/buttons/LineGraphTimeButton";
import { DateFilterProps } from "@/types/graphs";

/**
 *
 * DateFilter component displays a set of buttons for selecting a date range for a line graph.
 *
 * @returns {JSX.Element}
 */
const DateFilter = ({
  dateFilter,
  handleDateFilterChange,
}: DateFilterProps) => {
  return (
    <div className="flex flex-row items-center absolute bottom-8  ">
      {dateFilter.map((filter, index) => {
        return (
          <LineGraphTimeButton
            key={index}
            label={filter.label}
            onClick={() =>
              handleDateFilterChange(filter.startData, filter.endData)
            }
          />
        );
      })}
    </div>
  );
};

export default DateFilter;
