// React
import React from "react";

//Visx
import { Bar,LinePath } from "@visx/shape";
import useDateScale from "@/utils/hooks/useDateScale";
import useStockValueScale from "@/utils/hooks/useStockvalueScale";
import { curveMonotoneX } from "@visx/curve";

//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors";

//Components
import TooltipBar from "@/components/dashboard/TooltipBar";

//Hooks
import useHandleTooltipMultiple from "@/utils/hooks/useHandleTooltipMultiple";

//Types
import { LineGraphProps } from "@/types/graphs";
import { SecurityData } from "@/types/graphs";

const LineGraph = ({
  width,
  height,
  dataForLines,
  margin,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop,
  tooltipLeft,
}: LineGraphProps) => {

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const dateScale = useDateScale(dataForLines[0].data, margin, innerWidth); // x-axis
  const stockValueScale = useStockValueScale(dataForLines[0].data, margin, innerHeight); // y-axis

  // tooltip handler
  const handleTooltip = useHandleTooltipMultiple(
    (args) => showTooltip(args),
    stockValueScale,
    dateScale,
    ...dataForLines
  );

  return (
    <svg
      className="relative"
      width="100%" // Make the SVG width responsive
      height="90%" // Make the SVG height responsive
      viewBox={`0 0 ${width} ${height}`} // Use the viewBox to scale the content
      preserveAspectRatio="none" // Prevent aspect ratio issues if the div size changes
    >
      <rect
        x={0}
        y={0}
        width="100%"
        height="100%"
        fill="url(#area-background-gradient)"
        rx={14}
      />
      {dataForLines.map((linePayload, i) => (
        <LinePath
          key={i}
          data={linePayload.data}
          x={(d: SecurityData) => dateScale(getDate(d)) ?? 0}
          y={(d: SecurityData) => stockValueScale(getStockValue(d)) ?? 0}
          stroke={linePayload.color} 
          strokeWidth={linePayload.strokeWidth ?? 2} 
          curve={curveMonotoneX} 
        /> 
      ))}
      <Bar
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill="transparent"
        rx={14}
        onTouchStart={handleTooltip}
        onTouchMove={handleTooltip}
        onMouseMove={handleTooltip}
        onMouseLeave={() => hideTooltip()}
      />
      {tooltipData && (
        <TooltipBar
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          margin={margin}
          innerHeight={innerHeight}
          tooltipData={tooltipData}
          stockValueScale={stockValueScale}
        />
      )}
    </svg>
  );
};

export default LineGraph;
