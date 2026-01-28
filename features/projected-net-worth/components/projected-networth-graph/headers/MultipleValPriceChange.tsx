import ValueSummary from "@/components/dashboard/ValueSummary";
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getDirectionalColors } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";

// Components
import { LineIndicator } from "@/features/projected-net-worth/components/projected-networth-graph/headers/LineIndicator";

// Types
import { MultipleValPriceChangeProps } from "@/types/components/headers/graph-headers";

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
        
        const { primaryTextColor, lineColor } = getDirectionalColors(
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

export default MultipleValPriceChange;
