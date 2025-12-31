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
      if (line.value === "isInflation") return "with inflation";
      return "no inflation";
    }
    return "";
  };

  const withInflation = (line: LinePayload) => {
    return line.value === "isInflation";
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
            <div className="flex items-center justify-start gap-2  text-[0.7rem] rounded-full  w-[10rem] cursor-pointer mt-[0.2rem]">
              {!withInflation(line) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-secondary-1000"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              ) : null}
              {withInflation(line) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-red-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                  />
                </svg>
              ) : null}
              <span className="text-tertiary-800 font-normal text-[0.75rem] transition duration-300 rounded-[12px] hover:text-tertiary-1000 hover:border-tertiary-200 flex flex-row justify-center items-center text-center hover:underline">
                {!withInflation(line) ? "With inflation" : "Without inflation"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleValPriceChange;
