import React from "react";

//Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

//Components
import LineGraphTooltip from "@/features/projected-net-worth/components/projected-networth-graph/graphs/one-line-graph/LineGraphTooltip";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";
import LineGraph from "@/components/dashboard/LineGraph";
import MultipleValPriceChange from "@/components/dashboard/MultipleValPriceChange";

//Types
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

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

    return (
      <div className={`absolute h-[100%] w-full`}>
        {/* Stock Value and Price Change */}
        <div className="grid grid-cols-3">
          <MultipleValPriceChange
            dataForLines={dataForLines}
            tooltipData={tooltipData}
          />
          {withInlfationTag && dataForLines.length === 1 && (
            <div className="col-span-2 p-2 pt-4 flex items-start justify-end text-[0.7rem] text-tertiary-1000 gap-1 w-full">
              <InflationTag dataForLine={dataForLines[0]} />
            </div>
          )}
        </div>

        {/* The SVG for the graph */}
        <LineGraph
          width={width}
          height={height}
          dataForLines={dataForLines}
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
