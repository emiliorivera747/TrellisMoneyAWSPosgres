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

const MultipleValPriceChange = ({dataForLines, tooltipData}: MultipleValPriceChangeProps) => {
  const directions = dataForLines.map((line) => getLineDirection(line.data));

  return (
    <>
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
            subHeaderTailwindCss={`${tailwindPrimaryTextColor}`}
          />
        );
      })}
    </>
  );
};

export default MultipleValPriceChange;
