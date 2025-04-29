import React from "react";
import LineGraphFilterButton from "@/components/buttons/LineGraphFilterButton";
import { LineGraphFilterButtonsProps } from "@/types/graphs";
import { cn } from "@/lib/utils";

const Filter = ({
  filterConfig,
  selectedFilter,
  handleFilterChange,
  ref,
  className,
}: LineGraphFilterButtonsProps) => {
  const defaultClass = "grid grid-cols-3 gap-3 py-2";
  return (
    <div ref={ref} className={cn(defaultClass, className)}>
      {filterConfig.map((filter, index) => (
        <LineGraphFilterButton
          key={index}
          isSelected={selectedFilter === filter.key}
          svg_path={filter.svg_path}
          label={filter.label}
          onClick={() => handleFilterChange(filter.key)}
          color={filter.color}
        />
      ))}
    </div>
  );
};

export default Filter;
