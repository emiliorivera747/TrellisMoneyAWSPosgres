import React from "react";

//Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

//Components
import StockValueAndPriceChange from "@/features/projected-net-worth/components/projected-networth-graph/StockValueAndPriceChange";
import LineGraphTooltip from "@/features/projected-net-worth/components/projected-networth-graph/graphs/one-line-graph/LineGraphTooltip";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";
import LineGraph from "@/components/dashboard/LineGraph";

//Types
import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";
import { LinePayload } from "@/types/graphs";

//Functions
import { getColorBasedOnLineDirection } from "@/utils/helper-functions/getColorBasedOnLineDirection";
import { getLineDirection } from "@/utils/helper-functions/getLineDirection";

//Colors
import {
  upColor,
  downColor,
  flatColor,
} from "@/features/projected-net-worth/utils/graphColors";

import { TooltipPayload } from "@/types/graphs";

//TooltipData
type TooltipData = TooltipPayload[];

/**
 * Component for displaying a line graph.
 */
export default withTooltip<ProjectedLineGraphProps, TooltipData>(
  ({
    width,
    height,
    dataForLines,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    withInlfationTag = false,
  }: ProjectedLineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    // Get the directions for all of the lines
    const directions = dataForLines.map((line) => getLineDirection(line.data));
    const {
      lineColor,
      tailwindTagTextColor,
      tailwindTagBgColor,
      tailwindPrimaryTextColor,
    } = getTailwindColors(directions[0], dataForLines[0]);

    // Update the dataForLines with the lineColor
    const updatedDataForLines = dataForLines.map((line, index) => ({
      ...line,
      color: lineColor,
    }));

    return (
      <div className={`absolute h-[100%] w-full `}>
        <div className="grid grid-cols-3">
          <StockValueAndPriceChange
            tooltipPayload={tooltipData ? tooltipData[0] : null}
            data={dataForLines[0].data}
            subHeaderTailwindCss={`${tailwindPrimaryTextColor}`}
          />
          {withInlfationTag && dataForLines.length === 1 && (
            <div className="col-span-2 p-2 pt-4 flex items-start justify-end text-[0.7rem] text-tertiary-1000 gap-1 w-full">
              <InflationTag
                inflation_category={directions[0]}
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
          dataForLines={updatedDataForLines}
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
 *
 *  Get the tailwind colors based on the line direction
 *
 * @param direction
 * @returns
 */
const getTailwindColors = (direction: Direction, dataForLines: LinePayload) => {
  return {
    lineColor: getColorBasedOnLineDirection({
      direction,
      upColor,
      downColor,
      flatColor,
    }),
    tailwindTagTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines.tagTextColor?.upColor ?? "text-green-700",
      downColor: dataForLines.tagTextColor?.downColor ?? "text-red-700",
      flatColor: dataForLines.tagTextColor?.flatColor ?? "text-secondary-900",
    }),
    tailwindTagBgColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines.tagBgColor?.upColor ?? "bg-green-100",
      downColor: dataForLines.tagBgColor?.downColor ?? "bg-red-100",
      flatColor: dataForLines.tagBgColor?.flatColor ?? "bg-secondary-100",
    }),
    tailwindPrimaryTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines.subheaderColor?.upColor ?? "text-green-700",
      downColor: dataForLines.subheaderColor?.downColor ?? "text-red-700",
      flatColor: dataForLines.subheaderColor?.flatColor ?? "text-secondary-900",
    }),
  };
};
