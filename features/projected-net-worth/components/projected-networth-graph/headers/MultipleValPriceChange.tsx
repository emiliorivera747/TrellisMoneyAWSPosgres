import ValueAndPriceChange from "@/components/dashboard/ValueAndPriceChange";

//Types
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";

//Functions
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/graph-helpers/getTailwindColors";

interface MultipleValPriceChangeProps {
  payloadForLines: LineSeriesConfig[];
  tooltipData: TooltipConfig[];
}

/**
 *
 * Component for displaying multiple stock value and price change components
 *
 * @param param0
 * @returns
 */
const MultipleValPriceChange = ({
  payloadForLines,
  tooltipData,
}: MultipleValPriceChangeProps) => {
  if (!payloadForLines) return null;

  const directions = payloadForLines.map((line) => getLineDirection(line.data));
  const isMultipleLines = payloadForLines.length >= 2;

  const getLineName = (line: LineSeriesConfig) => {
    if (!isMultipleLines) return "";
    return line.filterValue === "inflationAdjusted"
      ? "with inflation"
      : "no inflation";
  };

  return (
    <div className="flex flex-row gap-2 w-[75%]">
      {payloadForLines.map((line, index) => {
        const { tailwindPrimaryTextColor, lineColor } = getTailwindColors(
          directions[index],
          line
        );
        const isInflationAdjusted = line.filterValue === "inflationAdjusted";
        return (
          <div key={(line.filterValue ?? "undefined") + index}>
            <ValueAndPriceChange
              tooltipPayload={tooltipData?.[index] ?? null}
              data={line.data}
              mainHeaderTailwindCss={`${
                isMultipleLines ? "text-[1.1rem]" : "text-[1.4rem]"
              } text-tertiary-1000 font-medium`}
              subHeaderTailwindCss={`${tailwindPrimaryTextColor} font-semibold text-[0.7rem]`}
              lineName={getLineName(line)}
            />
            <div className="flex items-center justify-start gap-2 text-[0.7rem] rounded-full w-[10rem] cursor-pointer mt-[0.2rem] ml-[0.17rem]">
              <span
                style={{
                  backgroundColor: lineColor,
                }}
                className={`w-[0.4rem] h-[0.14rem] rounded-full`}
              />
              <span className="text-tertiary-700 font-light text-[0.75rem] transition duration-300 rounded-[12px] hover:text-tertiary-1000 hover:border-tertiary-200 flex flex-row justify-center items-center text-center hover:underline">
                {isInflationAdjusted
                  ? "Adjusted for inflation"
                  : "Not adjusted for inflation"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleValPriceChange;
