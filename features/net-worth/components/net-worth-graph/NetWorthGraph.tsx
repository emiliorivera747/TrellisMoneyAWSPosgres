"use client";
import React, { useRef } from "react";

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
  TotalYears,
} from "@/components/dashboard/HeaderTimeValueGraph";
import InfoIconV2 from "@/components/information-icon/InfoIconV2";
import { netWorthInfo } from "@/features/projected-net-worth/utils/data/netWorthInfo";
import Filter from "@/components/dashboard/Filter";

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

    const { filter, handleFilterChange } = useAccountsContext();

    const svgRef = useRef<SVGSVGElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    return (
      <div className={`h-full w-full`}>
        <TimeValueGraphHeader
          linePayloads={linePayloads}
          tooltipData={tooltipData}
        >
          <div className="flex justify-between">
            <div className="flex items-center">
              <Title>Net Worth</Title>
              <InfoIconV2
                modalTitle="Net Worth"
                modalDescriptionT="Net worth is the total value of an individual's or entity's assets minus their liabilities. It represents financial wealth at a specific point in time."
                modalDescriptionB="A positive net worth indicates financial stability, while a negative net worth suggests debt exceeds assets. Tracking net worth helps assess financial healthciplined budgeting, and strategic investments can grow net worth over time."
                modalData={netWorthInfo}
                ref={svgRef}
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className=" text-tertiary-1000 border border-tertiary-300 text-xs flex flex-row justify-center gap-2 p-3 px-4 rounded-[12px] hover:bg-tertiary-200 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                  Filters
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent className="shadow-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="mb-6 border-b border-tertiary-400 pb-4 flex justify-between items-center">
                    Filters
                    <AlertDialogCancel className="border-none shadow-none rounded-full p-3 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </AlertDialogCancel>
                  </AlertDialogTitle>
                  <Filter
                    selectedFilter={filter}
                    handleFilterChange={handleFilterChange}
                    filterConfig={filterConfig}
                    className="grid grid-cols-2 gap-3 py-2"
                    ref={filterRef}
                  />
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-6">
                  <AlertDialogAction className="bg-tertiary-1000 py-6 rounded-[12px]">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Value lineIndex={0} />
          <div className="flex gap-1">
            <ValueChangeHeader
              lineIndex={0}
              className={`${primaryTextColorTW} text-[0.7rem]`}
            />
            <TotalYears lineIndex={0} className="text-[0.7rem]" />
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
