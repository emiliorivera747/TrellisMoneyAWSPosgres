// Components
import { LineIndicator } from "@/features/projected-net-worth/components/projected-networth-graph/headers/LineIndicator";
import ValueSummary from "@/components/dashboard/ValueSummary";

// Types
import { GraphLineSummariesProps } from "@/types/components/headers/graph-headers";

// Utils
import { getDirectionalColors } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";

const GraphLineSummaries = ({
  lineConfigs,
  tooltipConfigs,
}: GraphLineSummariesProps) => {
  if (!lineConfigs) return null;
  const isMultipleLines = lineConfigs.length >= 2;
  const headerSize = isMultipleLines ? "text-[1.1rem]" : "text-[1.4rem]";

  return (
    <div className="flex flex-row gap-2 w-[75%]">
      {lineConfigs.map((lineConfig, index) => {
        const direction = getLineDirection(lineConfig.data);
        const { primaryTextColor, lineColor } = getDirectionalColors(
          direction,
          lineConfig
        );

        const isInflationAdjusted =
          lineConfig.filterValue === "inflationAdjusted";
        const lineName = isMultipleLines
          ? isInflationAdjusted
            ? "with inflation"
            : "no inflation"
          : "";

        return (
          <div key={`${lineConfig.filterValue ?? "undefined"}-${index}`}>
            <ValueSummary
              tooltipPayload={tooltipConfigs?.[index] ?? null}
              data={lineConfig.data}
              mainHeaderTailwindCss={`${headerSize} text-tertiary-1000 font-medium`}
              subHeaderTailwindCss="font-semibold text-[0.7rem]"
              subHeaderStyle={{ color: primaryTextColor }}
              lineName={lineName}
            />
            <LineIndicator
              color={lineColor}
              isInflationAdjusted={isInflationAdjusted}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GraphLineSummaries;
