import React from "react";
import ListOfYears from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/ListOfYears";
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
          <div className="grid grid-cols-3 gap-2">
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
