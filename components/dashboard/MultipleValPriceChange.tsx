import React from "react";
import StockValueAndPriceChange from "@/components/dashboard/StockValueAndPriceChange";

//Types
import { LinePayload } from "@/types/graphs";

//Functions
import { getLineDirection } from "@/utils/helper-functions/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/getTailwindColors";

interface MultipleValPriceChangeProps {
    dataForLines: LinePayload[]; 
    tooltipData: any;
}

/**
 * 
 * Component for displaying multiple stock value and price change components
 * 
 * @param param0 
 * @returns 
 */
const MultipleValPriceChange = ({dataForLines, tooltipData}: MultipleValPriceChangeProps) => {
  const directions = dataForLines.map((line) => getLineDirection(line.data));
  const isMultipleLines = dataForLines.length >= 2;

  return (
    <div className="flex flex-row gap-2 w-[75%]">
      {dataForLines.map((line, index) => {
        const { tailwindPrimaryTextColor } = getTailwindColors(
          directions[index],
          line
        );
        return (
          <StockValueAndPriceChange
            key={index}
            tooltipPayload={tooltipData ? tooltipData[index] : null}
            data={line.data}
            mainHeaderTailwindCss={`${isMultipleLines ? 'text-[1.1rem]' : 'text-[1.4rem]'}  text-tertiary-1000 font-medium `}
            subHeaderTailwindCss={`${tailwindPrimaryTextColor} font-semibold text-[0.7rem]`}
          />
        );
      })}
    </div>
  );
};

export default MultipleValPriceChange;
