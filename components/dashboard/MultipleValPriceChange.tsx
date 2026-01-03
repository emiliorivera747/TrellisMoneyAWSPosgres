import ValueAndPriceChange from "@/components/dashboard/ValueAndPriceChange";

//Types
import { LinePayload } from "@/types/graphs";
import { TooltipPayload } from "@/types/graphs";

//Functions
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/getTailwindColors";

interface MultipleValPriceChangeProps {
  payloadForLines: LinePayload[];
  tooltipData: TooltipPayload[];
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

  const directions = payloadForLines.map((line) =>
    getLineDirection(line.lineData)
  );

  const isMultipleLines = payloadForLines?.length >= 2;

  const getLineName = (line: LinePayload) => {
    if (payloadForLines.length > 1) {
      if (line.value === "withInflation") return "with inflation";
      return "no inflation";
    }
    return "";
  };

  const withInflation = (line: LinePayload) => {
    return line.value === "withInflation";
  };

  return (
    <div className="flex flex-row gap-2 w-[75%]">
      {payloadForLines.map((line, index) => {
        const { tailwindPrimaryTextColor } = getTailwindColors(
          directions[index],
          line
        );
        return (
          <div key={(line.value ?? "undefined") + index}>
            <ValueAndPriceChange
              key={index}
              tooltipPayload={tooltipData ? tooltipData[index] : null}
              data={line.lineData}
              mainHeaderTailwindCss={`${
                isMultipleLines ? "text-[1.1rem]" : "text-[1.4rem]"
              }  text-tertiary-1000 font-medium `}
              subHeaderTailwindCss={`${tailwindPrimaryTextColor} font-semibold text-[0.7rem]`}
              lineName={getLineName(line)}
            />
            <div className="flex items-center justify-start gap-2  text-[0.7rem] rounded-full  w-[10rem] cursor-pointer mt-[0.2rem] ml-[0.17rem]">
              {!withInflation(line) ? (
                <span className="w-[0.35rem] h-[0.35rem] rounded-full bg-secondary-800"></span>
              ) : null}
              {withInflation(line) ? (
                <span className="w-[0.35rem] h-[0.35rem] rounded-full bg-red-600"></span>
              ) : null}
              <span className="text-tertiary-700 font-light text-[0.75rem] transition duration-300 rounded-[12px] hover:text-tertiary-1000 hover:border-tertiary-200 flex flex-row justify-center items-center text-center hover:underline">
                {!withInflation(line) ? "With Inflation" : "Without Inflation"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleValPriceChange;
