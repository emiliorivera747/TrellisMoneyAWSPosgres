import React from "react";

import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

//Components
import StockValueAndPriceChange from "@/features/projected-net-worth/components/projected-networth-graph/StockValueAndPriceChange";
import LineGraphTooltip from "@/features/projected-net-worth/components/projected-networth-graph/graphs/one-line-graph/LineGraphTooltip";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";
import LineGraph from "@/components/dashboard/LineGraph";

//Types
import {
  SecurityData,
  LineGraphProps,
  Direction,
} from "@/features/projected-net-worth/types/graphComponents";

//Functions
import { getColorBasedOnLineDirection } from "@/utils/helper-functions/getColorBasedOnLineDirection";
import { getLineDirection } from "@/utils/helper-functions/getLineDirection";

//Colors
import {
  upColor,
  downColor,
  flatColor,
} from "@/features/projected-net-worth/utils/graphColors";

//TooltipData
type TooltipData = SecurityData;

/**
 * Component for displaying a line graph.
 */
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

    // Get the color based on the line direction
    const direction = getLineDirection(data);

    // Get the colors for the line and the tags
    const {
      lineColor,
      tailwindTagTextColor,
      tailwindTagBgColor,
      tailwindPrimaryTextColor,
    } = getTailwindColors(direction);

    return (
      <div className={`absolute h-[100%] w-full `}>
        
        <div className="grid grid-cols-3">
          <StockValueAndPriceChange
            tooltipData={tooltipData ?? null}
            data={data}
            subHeaderTailwindCss={`${tailwindPrimaryTextColor}`}
          />
          {withInlfationTag && (
            <div className="col-span-2 p-2 pt-4 flex items-start justify-end text-[0.7rem] text-tertiary-1000 gap-1 w-full">
              <InflationTag
                inflation_category={direction}
                bg_color={tailwindTagBgColor}
                text_color={tailwindTagTextColor}
                svg_color="currentColor"
              />
            </div>
          )}
        </div>

        {/* The SVG for the graph */}
        <LineGraph
          width={width}
          height={height}
          dataForLines={[{ data: data, color: lineColor }]}
          margin={margin}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          tooltipData={tooltipData}
          tooltipTop={tooltipTop}
          tooltipLeft={tooltipLeft}
          lineColor={lineColor}
        />

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

/**
 *
 *  Get the tailwind colors based on the line direction
 *
 * @param direction
 * @returns
 */
const getTailwindColors = (direction: Direction)=> {
  return {
    lineColor: getColorBasedOnLineDirection({
      direction,
      upColor,
      downColor,
      flatColor,
    }),
    tailwindTagTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: "text-green-700",
      downColor: "text-red-700",
      flatColor: "text-secondary-900",
    }),
    tailwindTagBgColor: getColorBasedOnLineDirection({
      direction,
      upColor: "bg-green-100",
      downColor: "bg-red-100",
      flatColor: "bg-green-100",
    }),
    tailwindPrimaryTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: "text-secondary-900",
      downColor: "text-red-500",
      flatColor: "text-secondary-900",
    }),
  };
};
