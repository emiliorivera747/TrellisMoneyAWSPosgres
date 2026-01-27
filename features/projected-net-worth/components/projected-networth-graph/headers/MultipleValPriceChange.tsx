import ValueSummary from "@/components/dashboard/ValueSummary";
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/graph-helpers/getTailwindColors";

interface MultipleValPriceChangeProps {
  payloadForLines: LineSeriesConfig[];
  tooltipData: TooltipConfig[];
}

interface LineIndicatorProps {
  color: string;
  isInflationAdjusted: boolean;
}

const LineIndicator = ({ color, isInflationAdjusted }: LineIndicatorProps) => (
  <div className="flex items-center gap-2 mt-[0.2rem] ml-[0.17rem]">
    <span
      style={{ backgroundColor: color }}
      className="w-[0.4rem] h-[0.14rem] rounded-full"
    />
    <span className="text-tertiary-700 font-light text-[0.75rem] hover:text-tertiary-1000 hover:underline cursor-pointer">
      {isInflationAdjusted ? "Adjusted for inflation" : "Not adjusted for inflation"}
    </span>
  </div>
);

const MultipleValPriceChange = ({
  payloadForLines,
  tooltipData,
}: MultipleValPriceChangeProps) => {
  if (!payloadForLines) return null;

  const isMultipleLines = payloadForLines.length >= 2;
  const headerSize = isMultipleLines ? "text-[1.1rem]" : "text-[1.4rem]";

  return (
    <div className="flex flex-row gap-2 w-[75%]">
      {payloadForLines.map((line, index) => {
        const direction = getLineDirection(line.data);
        const { tailwindPrimaryTextColor, lineColor } = getTailwindColors(direction, line);
        const isInflationAdjusted = line.filterValue === "inflationAdjusted";
        const lineName = isMultipleLines
          ? isInflationAdjusted ? "with inflation" : "no inflation"
          : "";

        return (
          <div key={`${line.filterValue ?? "undefined"}-${index}`}>
            <ValueSummary
              tooltipPayload={tooltipData?.[index] ?? null}
              data={line.data}
              mainHeaderTailwindCss={`${headerSize} text-tertiary-1000 font-medium`}
              subHeaderTailwindCss="font-semibold text-[0.7rem]"
              subHeaderStyle={{ color: tailwindPrimaryTextColor }}
              lineName={lineName}
            />
            <LineIndicator color={lineColor} isInflationAdjusted={isInflationAdjusted} />
          </div>
        );
      })}
    </div>
  );
};

export default MultipleValPriceChange;
