import React from "react";
import { Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { LinePath } from "@visx/shape";

//Components
import StockValueAndPriceChange from "./StockValueAndPriceChange";
import LineGraphTooltip from "@/features/projected-net-worth/components/projected-networth-graph/LineGraphTooltip";

//Hooks
import useDateScale from "@/utils/hooks/useDateScale";
import useStockValueScale from "@/utils/hooks/useStockvalueScale";
import useHandleTooltipDouble from "@/utils/hooks/useHandleTooltipDouble";

//Types
import {
  SecurityData,
  DoubleLineGraphProps,
} from "@/features/projected-net-worth/types/graphComponents";

//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors";

export const background = "white";
export const background2 = "white";
export const accentColor = "#94d82d";
export const accentColorDark = "#495057";

type TooltipData = { data1: SecurityData; data2: SecurityData };

export default withTooltip<DoubleLineGraphProps, TooltipData>(
  ({
    width,
    height,
    data1,
    data2,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: DoubleLineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    /**
     * The innerWidth and innerHeight are the width and height of the graph
     */
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /**
     * The scales for the x and y axis
     */
    const dateScale1 = useDateScale(data1, margin, innerWidth); // x-axis
    const stockValueScale1 = useStockValueScale(data1, margin, innerHeight); // y-axis

    // tooltip handler
    const handleTooltip = useHandleTooltipDouble(
      (args) => showTooltip(args),
      stockValueScale1,
      dateScale1,
      data1,
      data2
    );

    console.log(tooltipData);
    return (
      <div className={` absolute h-[100%] w-full `}>
        <div className="flex flex-row gap-4">
          <StockValueAndPriceChange
            tooltipData={tooltipData?.data1 ? tooltipData.data1 : null}
            data={data1}
            withYears={false}
            mainHeaderTailwindCss="text-[1.2rem] font-medium"
          />
          <StockValueAndPriceChange
            tooltipData={tooltipData?.data2 ? tooltipData.data2 : null}
            data={data2}
            withYears={false}
            mainHeaderTailwindCss="text-[1.2rem] font-medium"
            subHeaderTailwindCss="text-primary-900"
          />
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
            data={data1}
            x={(d) => dateScale1(getDate(d)) ?? 0}
            y={(d) => stockValueScale1(getStockValue(d)) ?? 0}
            stroke="#51cf66" // Use the stroke for the line color
            strokeWidth={2}
            curve={curveMonotoneX} // Keep the curve for smoothness if desired
          />

          <LinePath
            data={data2}
            x={(d) => dateScale1(getDate(d)) ?? 0}
            y={(d) => stockValueScale1(getStockValue(d)) ?? 0}
            stroke="#4263eb" // Use the stroke for the line color
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
                stroke={"#868e96"}
                strokeWidth={0.4}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4.5}
                stroke="#40c057"
                fill="white"
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={stockValueScale1(getStockValue(tooltipData.data2))}
                r={4.5}
                stroke="#4c6ef5"
                fill="white"
                strokeWidth={2}
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
            tooltipData={tooltipData.data1}
          />
        )}
      </div>
    );
  }
);
