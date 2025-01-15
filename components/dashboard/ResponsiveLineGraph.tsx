import React from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import ProjectedLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/graphs/ProjectedLineGraph";
import { ResponsiveLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

const ResponsiveLineGraph = ({
  selectedYear,
  filteredDataForLines,
  tailwindClasses,
  withInflationTag = false,
}: ResponsiveLineGraphProps) => {
  return (
    <div className={`${tailwindClasses}`}>
      <ParentSize>
        {({ height, width }: { height: number; width: number }) => (
          <ProjectedLineGraph
            key={selectedYear}
            dataForLines={
              filteredDataForLines?.length > 0
                ? filteredDataForLines
                : [{ data: [], color: "" }]
            }
            width={width}
            height={height}
            margin={{ top: 6, right: 6, bottom: 10, left: 6 }}
            withInlfationTag={withInflationTag}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default ResponsiveLineGraph;
