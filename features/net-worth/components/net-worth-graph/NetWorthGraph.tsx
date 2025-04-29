import React from "react";

//Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

//Components
import LineGraphTooltip from "@/components/dashboard/LineGraphTooltip";
import LineGraphTimeValue from "@/components/dashboard/LineGraphTimeValue";
import NoLinePayloads from "@/features/projected-net-worth/components/projected-networth-graph/errors/NoLinePayloads";
import TimeValueGraphHeader, {
  Title,
  Value,
  ValueChangeHeader,
} from "@/components/dashboard/HeaderTimeValueGraph";

//Types
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

//Utils
import { checkLinePayloads } from "@/features/projected-net-worth/utils/checkLinePayloads";
import { TooltipPayload } from "@/types/graphs";
import { getTailwindColors } from "@/utils/helper-functions/graph/getTailwindColors";

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
  }: ProjectedLineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;
    if (checkLinePayloads(linePayloads) === false) return <NoLinePayloads />;

    const { primaryTextColorTW } = getTailwindColors(linePayloads[0]);

    return (
      <div className={`h-full w-full`}>
        <TimeValueGraphHeader
          linePayloads={linePayloads}
          tooltipData={tooltipData}
        >
          <Title>Net Worth</Title>
          <Value lineIndex={0} />
          <ValueChangeHeader
            lineIndex={0}
            className={`${primaryTextColorTW} text-[0.7rem]`}
          />
        </TimeValueGraphHeader>

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
