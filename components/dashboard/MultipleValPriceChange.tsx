import React from "react";
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

  return (
    <div className="flex flex-row gap-2 w-[75%]">
      {payloadForLines.map((line, index) => {
        const { tailwindPrimaryTextColor } = getTailwindColors(
          directions[index],
          line
        );
        return (
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
        );
      })}
    </div>
  );
};

export default MultipleValPriceChange;
