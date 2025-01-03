import React from 'react'
import {renderYearSelectorProps} from '@/features/projected-net-worth/types/graphComponents'
import YearSelector from '@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-sub-components/selectors/YearSelector'
import PrimaryButton from '@/components/buttons/PrimaryButton'


/**
 * Renders a container for the YearSelector component, which allows users to select a year from a given range.
 * 
 * @param param0 - An object containing the following properties:
 *  - showYearSelector: A boolean indicating whether the year selector should be displayed.
 *  - years: An array of available years for selection.
 *  - selectedYear: The currently selected year.
 *  - setSelectedYear: A function to update the selected year.
 *  - selectRetirementYear: A function to handle the selection of the retirement year.
 * 
 * @returns A container component that includes the YearSelector and a button to confirm the selection.
 */
const YearSelectorContainer = ({
  showYearSelector,
  years,
  selectedYear,
  setSelectedYear,
  selectRetirementYear,
  }: renderYearSelectorProps) => {

  // Edge case: No years available
  if (!years || years.length === 0) {
  return <div>No years available</div>
  }
  
  // Edge case: Selected year not in the list of years
  if (selectedYear && !years.includes(selectedYear)) {
  setSelectedYear(years[0])
  }

  return (
  <div
    className={`grid grid-cols-1 gap-x-4 gap-y-2 transition-all duration-1000 ease-in-out ${showYearSelector ? "opacity-100 h-auto" : "opacity-0 h-0"}`}
  >
    {showYearSelector && (
    <>
      <YearSelector
      years={years}
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
      />
      <PrimaryButton
      actionFunction={() => selectRetirementYear(selectedYear)}
      h="h-full"
      py="py-2"
      text="Update"
      />
    </>
    )}
  </div>
  )
}

export default YearSelectorContainer