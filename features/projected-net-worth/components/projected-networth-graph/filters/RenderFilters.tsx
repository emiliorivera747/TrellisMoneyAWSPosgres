// React
import React from 'react'

//Config
import { filterConfig } from '@/features/projected-net-worth/config/filterConfig'

//Components
import LineGraphFilterButton from '@/components/buttons/LineGraphFilterButton'

//Types
import { LineGraphFilterButtonsProps } from '@/features/projected-net-worth/types/filters'
import { InflationFilters } from '@/features/projected-net-worth/types/filters'

const RenderFilters = ({selectedFilter, handleFilterChange}: LineGraphFilterButtonsProps) => {
  return (
    <div className="gap-2 mt-4 grid grid-cols-5 items-center border-b border-tertiary-100 pb-6">
    {filterConfig.map(
      (filter: { key: InflationFilters; label: string; svg_path: string }, index) => (
        <LineGraphFilterButton
          key={index}
          isSelected={selectedFilter === filter.key}
          svg_path={filter.svg_path}
          label={filter.label}
          onClick={() => handleFilterChange(filter.key)}
        />
      )
    )}
  </div>
  )
}

export default RenderFilters