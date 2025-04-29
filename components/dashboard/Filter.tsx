import React from 'react';
import LineGraphFilterButton from "@/components/buttons/LineGraphFilterButton";
import { LineGraphFilterButtonsProps } from '@/types/graphs';

const Filter = ({filterConfig, selectedFilter, handleFilterChange }: LineGraphFilterButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 py-2">
    {filterConfig.map(
      (
        filter,
        index
      ) => (
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
}

export default Filter;
