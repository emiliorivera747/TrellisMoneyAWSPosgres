// React
import React from "react";

//Visx
import { Bar, LinePath } from "@visx/shape";
import useDateScale from "@/hooks/graphs/useDateScale";
import useStockValueScale from "@/hooks/graphs/useStockvalueScale";
import { curveMonotoneX } from "@visx/curve";

//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors";

//Components
import TooltipBar from "@/components/dashboard/TooltipBar";

//Hooks
import useHandleTooltipMultiple from "@/hooks/graphs/useHandleTooltipMultiple";

//Types
import { LineGraphProps, TimeSeriesData } from "@/types/graphs";

//Functions
import { getLineDirection } from "@/utils/helper-functions/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/getTailwindColors";

const defaultMargin = { top: 6, right: 6, bottom: 10, left: 6 };

const LineGraphTimeValue = ({
  width,
  height,
  dataForLines,
  margin = defaultMargin,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop,
  tooltipLeft,
}: LineGraphProps) => {

  if (width < 10 || height < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const dateScale = useDateScale(dataForLines[0].data, margin, innerWidth); // x-axis
  const allData = dataForLines.flatMap((line) => line.data);
  const stockValueScale = useStockValueScale(allData, margin, innerHeight); // y-axis
  const directions = dataForLines.map((line) => getLineDirection(line.data));

  // tooltip handler
  const handleTooltip = useHandleTooltipMultiple(
    (args) => showTooltip(args),
    stockValueScale,
    dateScale,
    ...dataForLines
  );

  return (
    <svg
      className=""
      width="100%"
      height="89%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <rect
        x={0}
        y={0}
        width="100%"
        height="100%"
        fill="url(#area-background-gradient)"
        rx={14}
      />
      {dataForLines.map((linePayload, i) => {
        const { lineColor } = getTailwindColors(directions[i], linePayload);
        return (
          <LinePath
            key={i}
            data={linePayload.data}
            x={(d: TimeSeriesData) => dateScale(getDate(d)) ?? 0}
            y={(d: TimeSeriesData) => stockValueScale(getStockValue(d)) ?? 0}
            stroke={lineColor}
            strokeWidth={linePayload.strokeWidth ?? 2}
            curve={curveMonotoneX}
          />
        );
      })}
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
          directions={directions}
        />
      )}
    </svg>
  );
};

export default LineGraphTimeValue;
