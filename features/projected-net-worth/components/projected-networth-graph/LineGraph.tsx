import React from "react";
import { Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { LinePath } from "@visx/shape";

//Components
import StockValueAndPriceChange from "./StockValueAndPriceChange";
import LineGraphTooltip from "@/features/projected-net-worth/components/projected-networth-graph/LineGraphTooltip";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";

//Hooks
import useDateScale from "@/utils/hooks/useDateScale";
import useStockValueScale from "@/utils/hooks/useStockvalueScale";
import useHandleTooltip from "@/utils/hooks/useHanldeTooltip";

//Types
import {
  SecurityData,
  LineGraphProps,
} from "@/features/projected-net-worth/types/graphComponents";

//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors";

//Functions
import { getColorBasedOnLineDirection } from "@/utils/helper-functions/getColorBasedOnLineDirection";
import { getLineDirection } from "@/utils/helper-functions/getLineDirection";
import { getInflationCategory } from "@/features/projected-net-worth/utils/getInflationCategory";


export const background = "white";
export const background2 = "white";
export const accentColor = "#94d82d";
export const upColor = "#74b816";
export const downColor = "rgb(239 68 68 / var(--tw-text-opacity, 1))";
export const flatColor = "#495057";
export const accentColorDark = "#495057";

type TooltipData = SecurityData;

export default withTooltip<LineGraphProps, TooltipData>(
  ({
    width,
    height,
    data,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    withInlfationTag = false,
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
    const dateScale = useDateScale(data, margin, innerWidth); // x-axis
    const stockValueScale = useStockValueScale(data, margin, innerHeight); // y-axis

    // tooltip handler
    const handleTooltip = useHandleTooltip(
      (args) => showTooltip(args),
      stockValueScale,
      dateScale,
      data
    );

    // Get the color based on the line direction
    const direction= getLineDirection(data);
    const lineColor = getColorBasedOnLineDirection({direction, upColor, downColor, flatColor});
    const tailwindPrimaryTextColor = getColorBasedOnLineDirection({direction, upColor: "text-green-700", downColor: "text-red-700", flatColor: "text-secondary-900"});
    const tailwindPrimaryBgColor = getColorBasedOnLineDirection({direction, upColor: "bg-green-100", downColor: "bg-red-100", flatColor: "bg-secondary-100"});


    return (
      <div className={` absolute h-[100%] w-full `}>
        <div className="grid grid-cols-3">
          <StockValueAndPriceChange
            tooltipData={tooltipData ?? null}
            data={data}
          />
          {withInlfationTag && (
            <div className="col-span-2 p-2 pt-4 flex items-start justify-end text-[0.7rem] text-tertiary-1000 gap-1 w-full">
              <InflationTag
                inflation_category={direction}
                bg_color={tailwindPrimaryBgColor}
                text_color={tailwindPrimaryTextColor}
                svg_color="currentColor"
              />
            </div>
          )}
        </div>

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
            stroke={lineColor} // Use the stroke for the line color
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
                stroke={lineColor}
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
