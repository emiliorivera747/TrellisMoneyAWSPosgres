"use client";

// Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

// Components
import DateAxisTooltip from "@/components/graphs/primary-time-value-graph/DateAxisTooltip";
import MultiLineTimeSeriesSvg from "@/components/graphs/primary-time-value-graph/MultiLineTimeSeriesSvg";
import NoLinePayloads from "@/features/projected-net-worth/components/projected-networth-graph/errors/NoLinePayloads";
import NetWorthGraphHeader from "@/features/net-worth/components/net-worth-graph/NetWorthGraphHeader";

// Types
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import { createGraphConfigs } from "@/types/components/admin/graphs/graph-config";

// Utils
import { checkLinePayloads } from "@/features/projected-net-worth/utils/graph-helpers/checkLinePayloads";

// TooltipData
type TooltipData = TooltipConfig[];

/**
 * Component for displaying a line graph.
 */
export default withTooltip<ProjectedLineGraphProps, TooltipData>(
  ({
    width,
    height,
    lineConfigs,
    margin,
    showTooltip,
    hideTooltip,
    tooltipData: tooltipConfigs,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: ProjectedLineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;
    if (checkLinePayloads(lineConfigs) === false) return <NoLinePayloads />;
    const graphConfigs = createGraphConfigs(lineConfigs, tooltipConfigs);

    return (
      <div className={`h-full w-full`}>
        <NetWorthGraphHeader graphConfigs={graphConfigs} />

        {/* The SVG for the graph */}
        <MultiLineTimeSeriesSvg
          width={width}
          height={height}
          lineConfigs={lineConfigs}
          margin={margin}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          tooltipConfigs={tooltipConfigs}
          tooltipTop={tooltipTop}
          tooltipLeft={tooltipLeft}
        />

        {/* Tooltip div */}
        {tooltipConfigs && (
          <DateAxisTooltip
            margin={{ top: -14 }}
            tooltipLeft={tooltipLeft}
            defaultStyles={defaultStyles}
            tooltipConfigs={tooltipConfigs}
          />
        )}
      </div>
    );
  }
);
