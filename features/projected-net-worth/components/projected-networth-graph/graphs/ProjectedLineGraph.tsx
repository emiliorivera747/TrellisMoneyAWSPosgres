import React from "react";

//Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

//Components
import LineGraphTooltip from "@/components/dashboard/LineGraphTooltip";
import LineGraphTimeValue from "@/components/dashboard/LineGraphTimeValue";
import PrimaryGraphHeader from "@/features/projected-net-worth/components/projected-networth-graph/headers/PrimaryGraphHeader";
import NoLinePayloads from "@/features/projected-net-worth/components/projected-networth-graph/errors/NoLinePayloads";

//Types
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

//Utils
import { checkLinePayloads } from "@/features/projected-net-worth/utils/checkLinePayloads";
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
    linePayloads,
    margin,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    withInlfationTag = false,
    years,
  }: ProjectedLineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    
    if (width < 10) return null;
    if (checkLinePayloads(linePayloads) === false) return <NoLinePayloads />;

    return (
      <div className={`h-full w-full`}>
        <PrimaryGraphHeader
          linePayloads={linePayloads}
          tooltipData={tooltipData}
          withInflationTag={withInlfationTag}
          years={years}
        />

        {/* The SVG for the graph */}
        <LineGraphTimeValue
          width={width}
          height={height}
          linePayloads={linePayloads}
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
