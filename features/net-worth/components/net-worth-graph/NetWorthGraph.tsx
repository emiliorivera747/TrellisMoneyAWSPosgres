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
import InformationIcon from "@/components/information-icon/InformationIcon";
import InfoIconV2 from "@/components/information-icon/InfoIconV2";

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

    const svgRef = useRef<SVGSVGElement>(null);

    return (
      <div className={`h-full w-full`}>
        <TimeValueGraphHeader
          linePayloads={linePayloads}
          tooltipData={tooltipData}
        >
          <Title>Net Worth</Title>
          <InfoIconV2
            modalTitle="Net Worth"
            modalDescriptionT="Net worth is the total value of an individual's or entity's assets minus their liabilities. It represents financial wealth at a specific point in time."
            modalDescriptionB="A positive net worth indicates financial stability, while a negative net worth suggests debt exceeds assets. Tracking net worth helps assess financial healthciplined budgeting, and strategic investments can grow net worth over time."
            modalData={[
              {
                header: "Assets",
                description:
                  "Include cash, investments, real estate, vehicles, and other valuable possessions.",
              },
              {
                header: "Liabilities",
                description:
                  "Include debts like mortgages, loans, credit card balances, and other obligations.",
              },
              {
                header: "Formula",
                description: "Net Worth = Total Assets - Total Liabilities.",
              },
            ]}
            ref={svgRef}
          />
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
