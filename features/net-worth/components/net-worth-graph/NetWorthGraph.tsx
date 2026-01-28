"use client";
import { useRef } from "react";

// Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

// Components
import DateAxisTooltip from "@/components/dashboard/DateAxisTooltip";
import MultiLineTimeSeriesSvg from "@/components/dashboard/MultiLineTimeSeriesSvg";
import NoLinePayloads from "@/features/projected-net-worth/components/projected-networth-graph/errors/NoLinePayloads";
import GraphSummaryHeader, {
  Value,
  ValueChange,
  TotalYears,
} from "@/components/dashboard/HeaderTimeValueGraph";
import GraphFilterButtonWithModal from "@/components/buttons/GraphFilterButtonWithModal";
import GraphHeader from "@/components/headers/GraphHeader";
import NetWorthGraphHeader from "@/features/net-worth/components/net-worth-graph/NetWorthGraphHeader";

// Types
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

// Utils
import { checkLinePayloads } from "@/features/projected-net-worth/utils/graph-helpers/checkLinePayloads";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import { getDirectionalColors } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";

// TooltipData
type TooltipData = TooltipConfig[];

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";

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

    return (
      <div className={`h-full w-full`}>
        <NetWorthGraphHeader
          lineConfigs={lineConfigs}
          tooltipConfigs={tooltipConfigs || []}
        />

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
            margin={margin}
            tooltipLeft={tooltipLeft}
            defaultStyles={defaultStyles}
            tooltipConfigs={tooltipConfigs}
          />
        )}
      </div>
    );
  }
);
