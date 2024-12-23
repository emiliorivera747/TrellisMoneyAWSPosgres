import React from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import RenderTooltipContent from "@/components/dashboard/RenderTooltipContent";
import { SecurityData } from "@/types/dashboardComponents";

// functions
import { getStockValue } from "@/utils/helper-functions/accessors";
import numberToMoneyFormat from "@/utils/helper-functions/numberToMoneyFormat";
const StockValueAndPriceChange = ({
  tooltipData,
  data,
}: {
  tooltipData: SecurityData | undefined;
  data: SecurityData[];
}) => {
  return (
    <div className="flex flex-col">
    <span className="text-xl font-medium text-zinc-800 tracking-wider">
      {tooltipData
        ? `${numberToMoneyFormat(getStockValue(tooltipData)) || "0.00"}`
        : `${numberToMoneyFormat(data[data.length - 1]?.close)|| "0.00"}`}
    </span>
      <span
        style={{ color: "#74b816" }}
        className="flex-row flex items-center text-[0.7rem] font-semibold gap-1"
      >
        <TiArrowSortedUp />
        {tooltipData ? (
          <RenderTooltipContent tooltipData={tooltipData} data={data} />
        ) : (
          "$500"
        )}
      </span>
    </div>
  );
};



export default StockValueAndPriceChange;


