"use client";
import { useRef } from "react";

// Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";

// Components
import LineGraphTooltip from "@/components/dashboard/LineGraphTooltip";
import LineGraphTimeValue from "@/components/dashboard/LineGraphTimeValue";
import NoLinePayloads from "@/features/projected-net-worth/components/projected-networth-graph/errors/NoLinePayloads";
import TimeValueGraphHeader, {
  Title,
  Value,
  ValueChangeHeader,
  TotalYears,
} from "@/components/dashboard/HeaderTimeValueGraph";
import GraphFilterButtonWithModal from "@/components/buttons/GraphFilterButtonWithModal";
import GraphHeader from "@/components/headers/GraphHeader";

// Types
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

// Utils
import { checkLinePayloads } from "@/features/projected-net-worth/utils/checkLinePayloads";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import { getTailwindColors } from "@/utils/helper-functions/graph/getTailwindColors";

// TooltipData
type TooltipData = TooltipConfig[];

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";

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
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: ProjectedLineGraphProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;
    if (checkLinePayloads(lineConfigs) === false) return <NoLinePayloads />;

    const svgRef = useRef<SVGSVGElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    const payloadLen = lineConfigs.length;

    return (
      <div className={`h-full w-full`}>
        <TimeValueGraphHeader
          lineConfigs={lineConfigs}
          tooltipData={tooltipData}
        >
          <div className="grid grid-cols-2 w-full">
            <div className={"grid grid-cols-[14rem_14rem]"}>
              {lineConfigs.map((linePayload, index) => {
                const { primaryTextColorTW } = getTailwindColors(linePayload);
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex">
                      <div className="flex items-center">
                        <GraphHeader label={"Net Worth"} />
                      </div>
                    </div>
                    <Value
                      lineIndex={index}
                      className={`${payloadLen > 1 ? "text-[1.2rem]" : ""}`}
                    />
                    <div className="flex gap-1">
                      <ValueChangeHeader
                        lineIndex={index}
                        className={`${primaryTextColorTW} text-[0.7rem]`}
                      />
                      <TotalYears lineIndex={index} className="text-[0.7rem]" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <GraphFilterButtonWithModal
                filterConfig={filterConfig}
                ref={filterRef}
                className="grid grid-cols-2"
              />
            </div>
          </div>
        </TimeValueGraphHeader>

        {/* The SVG for the graph */}
        <LineGraphTimeValue
          width={width}
          height={height}
          lineConfigs={lineConfigs}
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
