import React from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import RenderTooltipContent from "@/features/projected-net-worth/components/projected-networth-graph/RenderTooltipContent";
import { SecurityData } from "@/types/dashboardComponents";

// functions
import { getStockValue } from "@/utils/helper-functions/accessors";
import numberToMoneyFormat from "@/utils/helper-functions/numberToMoneyFormat";
const StockValueAndPriceChange = ({
  tooltipData,
  data,
}: {
  tooltipData: SecurityData | null;
  data: SecurityData[];
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-[1.4rem] font-medium text-zinc-800 tracking-wider">
        {tooltipData
          ? `${numberToMoneyFormat(getStockValue(tooltipData)) || "0.00"}`
          : `${numberToMoneyFormat(data[data.length - 1]?.close) || "0.00"}`}
      </span>
      <span className="flex-row flex items-center text-[0.7rem] font-semibold gap-1 text-secondary-900 s">
        <TiArrowSortedUp />
        <RenderTooltipContent tooltipData={tooltipData} data={data} />
      </span>
    </div>
  );
};

export default StockValueAndPriceChange;
