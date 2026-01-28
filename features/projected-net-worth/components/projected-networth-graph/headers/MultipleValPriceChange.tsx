import ValueSummary from "@/components/dashboard/ValueSummary";
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/graph-helpers/getTailwindColors";

// Components
import { LineIndicator } from "@/features/projected-net-worth/components/projected-networth-graph/headers/LineIndicator";

interface MultipleValPriceChangeProps {
  lineConfigs: LineSeriesConfig[];
  tooltipConfigs: TooltipConfig[];
}

const MultipleValPriceChange = ({
  lineConfigs,
  tooltipConfigs,
}: MultipleValPriceChangeProps) => {
  if (!lineConfigs) return null;

  const isMultipleLines = lineConfigs.length >= 2;
  const headerSize = isMultipleLines ? "text-[1.1rem]" : "text-[1.4rem]";

  return (
    <div className="flex flex-row gap-2 w-[75%]">
      {lineConfigs.map((line, index) => {
        const direction = getLineDirection(line.data);
        const { tailwindPrimaryTextColor, lineColor } = getTailwindColors(
          direction,
          line
        );
        const isInflationAdjusted = line.filterValue === "inflationAdjusted";
        const lineName = isMultipleLines
          ? isInflationAdjusted
            ? "with inflation"
            : "no inflation"
          : "";

        return (
          <div key={`${line.filterValue ?? "undefined"}-${index}`}>
            <ValueSummary
              tooltipPayload={tooltipConfigs?.[index] ?? null}
              data={line.data}
              mainHeaderTailwindCss={`${headerSize} text-tertiary-1000 font-medium`}
              subHeaderTailwindCss="font-semibold text-[0.7rem]"
              subHeaderStyle={{ color: tailwindPrimaryTextColor }}
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

export default MultipleValPriceChange;
