import React, { useMemo, useCallback } from "react";
import { Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { LinePath } from "@visx/shape";

//Components
import StockValueAndPriceChange from "./StockValueAndPriceChange";
import LineGraphTooltip from "@/components/dashboard/LineGraphTooltip";

//Hooks
import useDateScale from "@/utils/hooks/useDateScale";
import useStockValueScale from "@/utils/hooks/useStockvalueScale";
import useHandleTooltip from "@/utils/hooks/useHanldeTooltip";

//Types
import { SecurityData, LineGraphProps } from "@/types/dashboardComponents";

//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors";

export const background = "white";
export const background2 = "white";
export const accentColor = "#94d82d";
export const accentColorDark = "#495057";

type TooltipData = SecurityData;

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
    const dateScale = useDateScale(data, margin, innerWidth);
    const stockValueScale = useStockValueScale(data, margin, innerHeight);

    // tooltip handler
    const handleTooltip = useHandleTooltip(
      (args) => showTooltip(args),
      stockValueScale,
      dateScale,
      data
    );
    return (
      <div className={` absolute h-[100%] w-full `}>
        <StockValueAndPriceChange
          tooltipData={tooltipData ?? null}
          data={data}
        />
        {/* The SVG for the graph */}
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
          <LinePath
            data={data}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            stroke="#51cf66" // Use the stroke for the line color
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
                from={{ x: tooltipLeft, y: margin.top + 54 }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={"#868e96"} // Changed the line color to red
                strokeWidth={0.4}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4.5}
                stroke="#40c057"
                fill="white"
                strokeWidth={2.5}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>

        {/* Tooltip div */}
        {tooltipData && (
          <LineGraphTooltip
            margin={margin}
            tooltipLeft={tooltipLeft}
            defaultStyles={defaultStyles}
            tooltipData={tooltipData}
          />
        )}
      </div>
    );
  }
);
