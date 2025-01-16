import React from 'react'

import { filterConfig } from '@/features/projected-net-worth/config/filterConfig'
import LineGraphFilterButton from '@/components/buttons/LineGraphFilterButton'

interface LineGraphFilterButtonProps {
    selectedFilter: string
    handleFilterChange: (key: string) => void
}

const RenderFilters = ({selectedFilter, handleFilterChange}: LineGraphFilterButtonProps) => {
  return (
    <div className="gap-2 mt-4 grid grid-cols-6 items-center border-b border-tertiary-100 pb-6">
    {filterConfig.map(
      (filter: { key: string; label: string; svg_path: string }) => (
        <LineGraphFilterButton
          key={filter.key}
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