// React
import React from "react";

//Visx
import { Bar, LinePath } from "@visx/shape";
import useDateScale from "@/hooks/graphs/useDateScale";
import useStockValueScale from "@/hooks/graphs/useStockvalueScale";
import { curveMonotoneX } from "@visx/curve";


//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors/accessors";

//Components
import TooltipBar from "@/components/dashboard/TooltipBar";

//Hooks
import useHandleTooltipMultiple from "@/hooks/graphs/useHandleTooltipMultiple";

//Types
import { LineGraphTimeValueProps, TimeSeriesData } from "@/types/graphs";

//Functions
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/getTailwindColors";

const defaultMargin = { top: 6, right: 6, bottom: 10, left: 6 };

/**
 *
 * Renders multiple lines on graph with a tooltip.
 *
 * @param {number} width - The width of the graph.
 * @param {number} height - The height of the graph.
 * @param {Array} linePayLoads - The data for the lines to be rendered. Styles should be provided.
 * @param {object} margin - The margin of the graph.
 * @param {function} showTooltip - The function to show the tooltip.
 * @param {function} hideTooltip - The function to hide the tooltip.
 * @param {Array} tooltipData - The data to be displayed in the tooltip.
 * @param {number} tooltipTop - The top position of the tooltip.
 * @param {number} tooltipLeft - The left position of the tooltip.
 *
 * @returns
 */
const LineGraphTimeValue = ({
  width,
  height,
  linePayloads,
  margin = defaultMargin,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop,
  tooltipLeft,
  curve = curveMonotoneX,
  backgroundFill = "url(#area-background-gradient)",
}: LineGraphTimeValueProps) => {
  
  if (width < 10 || height < 10) return null;
  if (!linePayloads) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const dateScale = useDateScale(linePayloads[0].lineData, margin, innerWidth); // x-axis
  const allData = linePayloads.flatMap((line) => line.lineData);
  const stockValueScale = useStockValueScale(allData, margin, innerHeight); // y-axis
  const directions = linePayloads.map((line) => getLineDirection(line.lineData));
  
  // tooltip handler
  const handleTooltip = useHandleTooltipMultiple(
    (args) => showTooltip(args),
    stockValueScale,
    dateScale,
    ...linePayloads
  );

  return (
    <svg
      className=""
      width="100%"
      height="86%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <rect
        x={0}
        y={0}
        width="100%"
        height="100%"
        fill={backgroundFill}
        rx={14}
      />
      {linePayloads.map((linePayload, i) => {
        const { lineColor } = getTailwindColors(directions[i], linePayload) ;
        return (
          <LinePath
            key={i}
            data={linePayload.lineData}
            x={(d: TimeSeriesData) => (dateScale ? dateScale(getDate(d)) : 0)}
            y={(d: TimeSeriesData) => (stockValueScale ? stockValueScale(getStockValue(d)) : 0)}
            stroke={lineColor}
            strokeWidth={linePayload.strokeWidth ?? 2}
            curve={curve}
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
          stockValueScale={stockValueScale ?? (() => 0)}
          directions={directions}
        />
      )}
    </svg>
  );
};

export default LineGraphTimeValue;
