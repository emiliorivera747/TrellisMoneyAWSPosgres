import React from "react";
import { Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { LinePath } from "@visx/shape";

//Components
import StockValueAndPriceChange from "../../StockValueAndPriceChange";
import LineGraphTooltip from "@/features/projected-net-worth/components/projected-networth-graph/graphs/one-line-graph/LineGraphTooltip";
import LineGraph from "@/components/dashboard/LineGraph";

//Hooks
import useDateScale from "@/utils/hooks/useDateScale";
import useStockValueScale from "@/utils/hooks/useStockvalueScale";
import useHandleTooltipDouble from "@/utils/hooks/useHandleTooltipDouble";

//Types
import {
  SecurityData,
  DoubleLineGraphProps,
} from "@/features/projected-net-worth/types/graphComponents";
import { Directions } from "@/features/projected-net-worth/types/graphComponents";

//Accessors
import { getDate, getStockValue } from "@/utils/helper-functions/accessors";

//Colors
import {
  upColor,
  downColor,
  flatColor,
  upColor2,
  downColor2,
  flatColor2,
} from "@/features/projected-net-worth/utils/graphColors";
import { TooltipPayload } from "@/types/graphs";
type TooltipData = TooltipPayload[];

//Functions
import { getLineDirections } from "@/utils/helper-functions/getLineDirections";
import { getLineColors } from "@/utils/helper-functions/getLineColors";
import { getColorBasedOnLineDirection } from "@/utils/helper-functions/getColorBasedOnLineDirection";

/**
 * Component for displaying a double line graph.
 */
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

    // Get the line directions
    const { directionLine1, directionLine2 } = getLineDirections({
      data1,
      data2,
    });

    // Get the line colors
    const { lineColor1, lineColor2 } = getLineColorsForGraph({
      directionLine1,
      directionLine2,
    });

    // Get the primary text color based on the line direction
    const tailwindPrimaryTextColor = getColorBasedOnLineDirection({
      direction: directionLine1,
      upColor: "text-primary-900",
      downColor: "text-red-700",
      flatColor: "text-primary-900",
    });
    console.log("TOOLTIP DATA", tooltipData);
    return (
      <div className={` absolute h-[100%] w-full `}>
        {/* The stock value and price change components */}
        <div className="flex flex-row gap-4">
          <StockValueAndPriceChange
            tooltipPayload={tooltipData?.[0] ?? null}
            data={data1}
            withYears={false}
            mainHeaderTailwindCss="text-[1.1rem] font-medium"
          />
          <StockValueAndPriceChange
            tooltipPayload={tooltipData?.[1] ?? null}
            data={data2}
            withYears={false}
            mainHeaderTailwindCss="text-[1.1rem] font-medium"
            subHeaderTailwindCss={`${tailwindPrimaryTextColor}`}
          />
        </div>

        <LineGraph
          width={width}
          height={height}
          dataForLines={[
            { data: data1, color: lineColor1 },
            { data: data2, color: lineColor2 },
          ]}
          margin={margin}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          tooltipData={tooltipData}
          tooltipTop={tooltipTop}
          tooltipLeft={tooltipLeft}
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
 * Get the line colors for the graph
 *
 * @param param0
 * @returns
 */
function getLineColorsForGraph({ directionLine1, directionLine2 }: Directions) {
  const lineColors = [
    {
      upColor: upColor,
      downColor: downColor,
      flatColor: flatColor,
      direction: directionLine1,
    },
    {
      upColor: upColor2,
      downColor: downColor2,
      flatColor: flatColor2,
      direction: directionLine2,
    },
  ];

  const lineColorsArray = getLineColors(lineColors);
  return {
    lineColor1: lineColorsArray[0],
    lineColor2: lineColorsArray[1],
  };
}
