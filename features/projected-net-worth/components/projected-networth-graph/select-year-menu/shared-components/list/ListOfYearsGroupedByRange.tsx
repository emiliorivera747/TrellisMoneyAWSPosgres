import React from "react";
import ListOfYears from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/shared-components/list/ListOfYears";
import { ListOfYearsGroupedByRangeProps } from "@/features/projected-net-worth/types/selectYearMenu";

/**
 * Component that renders a list of years grouped by ranges before retirement.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.actionFn - The function to be called when an action is performed on a year.
 * @param {Object} props.beforeRetirementRanges - An object where keys are ranges (e.g., "10-15") and values are arrays of years within those ranges.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ListOfYearsGroupedByRange = ({
  actionFn,
  beforeRetirementRanges,
}: ListOfYearsGroupedByRangeProps): JSX.Element => {

  if (!beforeRetirementRanges || typeof beforeRetirementRanges !== 'object') {
    return <div>No data available</div>;
  }

  return (
    <div>
      {Object.keys(beforeRetirementRanges).map((range) => (
        <div key={range} className="mb-4">
          <h2 className="text-tertiary-800 text-[0.8rem] mb-1">
            {range} years until retirement
          </h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-2">
            <ListOfYears
              years={beforeRetirementRanges[range]}
              actionFn={actionFn}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOfYearsGroupedByRange;
