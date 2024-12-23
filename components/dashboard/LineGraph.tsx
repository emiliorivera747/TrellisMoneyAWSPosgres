import React, { useMemo, useCallback } from "react";
import { Line, Bar } from "@visx/shape";
// import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { curveMonotoneX } from "@visx/curve";
import { scaleTime, scaleLinear } from "@visx/scale";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { max, extent, bisector } from "@visx/vendor/d3-array";
import { timeFormat } from "@visx/vendor/d3-time-format";
import { LinePath } from "@visx/shape";

//Components
import RenderTooltipContent from "@/components/dashboard/RenderTooltipContent";
import StockValueAndPriceChange from "./StockValueAndPriceChange";

//Icons
import { TiArrowSortedUp } from "react-icons/ti";

//Functions
import { calculateRateOfChange } from "@/utils/helper-functions/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/calculateYearsBetween";

//Hooks
import useDateScale from "@/utils/hooks/useDateScale";
import useStockValueScale from "@/utils/hooks/useStockvalueScale";
import useHandleTooltip from "@/utils/hooks/useHanldeTooltip";

//Types
import { SecurityData, LineGraphProps } from "@/types/dashboardComponents";

export const background = "white";
export const background2 = "white";
export const accentColor = "#94d82d";
export const accentColorDark = "#495057";

type TooltipData = SecurityData;

// util
const formatDate = timeFormat("%b %d, %Y");

// accessors
const getDate = (d: SecurityData) => new Date(d?.date);
const getStockValue = (d: SecurityData) => d?.close;

export default withTooltip<LineGraphProps, TooltipData>(
  ({
    selectedYear,
    width,
    height,
    data,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: LineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    /**
     * The innerWidth and innerHeight are the width and height of the graph
     */
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /**
     * The scales for the x and y axis
     */
    const dateScale = useDateScale(data, margin, width);
    const stockValueScale = useStockValueScale(data, margin, height);

    // tooltip handler
    const handleTooltip = useHandleTooltip(
      (args) => showTooltip(args),
      stockValueScale,
      dateScale,
      data
    );

    console.log("data", data);
    console.log("dateScale", dateScale);

  
    return (
      <>
         <StockValueAndPriceChange tooltipData={tooltipData} data={data} />
        {/* The SVG for the graph */}
        <svg
          width="100%" // Make the SVG width responsive
          height="80%" // Make the SVG height responsive
          viewBox={`0 0 ${width + 6} ${height + 6}`} // Use the viewBox to scale the content
          preserveAspectRatio="none" // Prevent aspect ratio issues if the div size changes
        >
          <rect
            x={0}
            y={0}
            width="100%"
            height="80%"
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <LinePath
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            stroke="rgb(0, 200, 5)" // Use the stroke for the line color
            strokeWidth={2}
            curve={curveMonotoneX} // Keep the curve for smoothness if desired
          />
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
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top + 120 }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={0.6}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={"rgb(0, 200, 5)"}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>

        {/* Tooltip div */}
        {tooltipData && (
          <div>
            <Tooltip
              top={margin.top + 110}
              left={tooltipLeft - 10}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
                fontSize: "0.6rem",
                background: "none",
                border: "none", // Remove the border
                color: "#495057", // Change the text color to red
                boxShadow: "none", // Ensure no box shadow is applied
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </>
    );
  }
);
