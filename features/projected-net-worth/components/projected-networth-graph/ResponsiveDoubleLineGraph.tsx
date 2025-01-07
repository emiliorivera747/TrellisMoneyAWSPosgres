import React from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { ResponsiveDoubleLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";
import DoubleLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/DoubleLineGraph";

const ResponsiveDoubleLineGraph = ({
  selectedYear,
  filteredData1,
  filteredData2,
  tailwindClasses,
}: ResponsiveDoubleLineGraphProps) => {
  return (
    <div className={`${tailwindClasses}`}>
      <ParentSize>
        {({ height, width }: { height: number; width: number }) => (
          <DoubleLineGraph
            key={selectedYear}
            data1={
              filteredData1?.length > 0
                ? filteredData1
                : [{ date: new Date(), close: 0 }]
            }
            data2={
              filteredData2?.length > 0
                ? filteredData2
                : [{ date: new Date(), close: 0 }]
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

export default ResponsiveDoubleLineGraph;
