import React from "react";

//Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

//Components
import LineGraphTooltip from "@/components/dashboard/LineGraphTooltip";
import LineGraph from "@/components/dashboard/LineGraph";
import PrimaryGraphHeader from "@/features/projected-net-worth/components/projected-networth-graph/headers/PrimaryGraphHeader";

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
    years,
    selectedYear,
    retirementYear,
    setSelectedYear,
    editRetirementYear,
  }: ProjectedLineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    return (
      <div className={`h-full w-full`}>
        <PrimaryGraphHeader
          dataForLines={dataForLines}
          tooltipData={tooltipData}
          withInflationTag={withInlfationTag}
          years={years}
          selectedYear={selectedYear}
          retirementYear={retirementYear}
          setSelectedYear={setSelectedYear}
          editRetirementYear={editRetirementYear}
        />
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
