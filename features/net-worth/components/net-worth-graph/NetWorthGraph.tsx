"use client";
import { useRef } from "react";

//Visx
import { withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
//
//Components
import LineGraphTooltip from "@/components/dashboard/LineGraphTooltip";
import LineGraphTimeValue from "@/components/dashboard/LineGraphTimeValue";
import NoLinePayloads from "@/features/projected-net-worth/components/projected-networth-graph/errors/NoLinePayloads";
import TimeValueGraphHeader, {
  Title,
  Value,
  ValueChangeHeader,
  TotalYears,
} from "@/components/dashboard/HeaderTimeValueGraph";
import InfoIconV2 from "@/components/information-icon/InfoIconV2";
import { netWorthInfo } from "@/features/projected-net-worth/utils/data/netWorthInfo";
import GraphFilterButtonWithModal from "@/components/buttons/GraphFilterButtonWithModal";

//Types
import { ProjectedLineGraphProps } from "@/features/projected-net-worth/types/graphComponents";

//Utils
import { checkLinePayloads } from "@/features/projected-net-worth/utils/checkLinePayloads";
import { TooltipPayload } from "@/types/graphs";
import { getTailwindColors } from "@/utils/helper-functions/graph/getTailwindColors";

//TooltipData
type TooltipData = TooltipPayload[];

import { useAccountsContext } from "@/context/accounts/AccountContext";

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";

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

    const { filter, handleFilterChange } = useAccountsContext();

    const svgRef = useRef<SVGSVGElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    const payloadLen = linePayloads.length;

    return (
      <div className={`h-full w-full`}>
        <TimeValueGraphHeader
          linePayloads={linePayloads}
          tooltipData={tooltipData}
        >
          <div className="grid grid-cols-2 w-full">
            <div className={"grid grid-cols-[14rem_14rem]"}>
              {linePayloads.map((linePayload, index) => {
                const { primaryTextColorTW } = getTailwindColors(linePayload);
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex">
                      <div className="flex items-center">
                        <Title
                          className={`${payloadLen > 1 ? "text-[1.2rem]" : ""}`}
                        >
                          {linePayload.value}
                        </Title>
                        <InfoIconV2
                          modalTitle="Net Worth"
                          modalDescriptionT="Net worth is the total value of an individual's or entity's assets minus their liabilities. It represents financial wealth at a specific point in time."
                          modalDescriptionB="A positive net worth indicates financial stability, while a negative net worth suggests debt exceeds assets. Tracking net worth helps assess financial healthciplined budgeting, and strategic investments can grow net worth over time."
                          modalData={netWorthInfo}
                          ref={svgRef}
                        />
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
                selectedFilter={filter}
                handleFilterChange={handleFilterChange}
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
