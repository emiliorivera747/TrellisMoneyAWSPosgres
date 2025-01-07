import React from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import LineGraph from "@/features/projected-net-worth/components/projected-networth-graph/LineGraph";
import { ResponsiveLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

const ResponsiveLineGraph = ({
  selectedYear,
  filteredData,
  tailwindClasses,
}: ResponsiveLineGraphProps) => {

  return (
    <div className={`${tailwindClasses}`}>
      <ParentSize>
        {({ height, width }: { height: number; width: number }) => (
          <LineGraph
            key={selectedYear}
            data={
              filteredData?.length > 0
                ? filteredData
                : [{ date: new Date(2024), close: 0 }]
            }
            selectedYear={selectedYear}
            width={width}
            height={height}
            margin={{ top: 6, right: 6, bottom: 10, left: 6 }}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default ResponsiveLineGraph;
