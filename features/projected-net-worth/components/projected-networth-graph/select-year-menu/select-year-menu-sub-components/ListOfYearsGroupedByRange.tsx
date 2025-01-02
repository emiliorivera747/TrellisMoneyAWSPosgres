import React from "react";
import ListOfYears from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/select-year-menu-sub-components/ListOfYears";
interface ListOfYearsProps {
  actionFn: (year: number) => void;
  beforeRetirementRanges: Record<string, number[]>;
}

const ListOfYearsGroupedByRange = ({
  actionFn,
  beforeRetirementRanges,
}: ListOfYearsProps) => {
  return (
    <div>
      {Object.keys(beforeRetirementRanges).map((range) => (
        <div key={range} className="mb-4">
          <h2 className="text-tertiary-800 text-[0.8rem] mb-1">
            {range} years until retirement
          </h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2">
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
