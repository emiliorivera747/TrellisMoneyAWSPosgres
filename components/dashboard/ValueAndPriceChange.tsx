import React from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import RenderTooltipContent from "@/components/dashboard/RenderTooltipContent";

// Functions
import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";

import {ValueAndPriceChangeProps } from "@/types/graphs";


const ValueAndPriceChange = ({
  tooltipPayload,
  data,
  withYears = true,
  mainHeaderTailwindCss = "text-zinc-800 text-[1.4rem] font-medium ",
  subHeaderTailwindCss = "text-secondary-900",
  withInfo = false,
  lineName = "",
}: ValueAndPriceChangeProps) => {
  
  if (!data) return null;

  return (
    <div className="flex flex-col min-w-[15.5rem] w-auto">
      <span
        className={`tracking-wider ${mainHeaderTailwindCss} flex gap-2 items-center `}
      >
        {tooltipPayload
          ? `${numberToMoneyFormat(getStockValue(tooltipPayload.d)) || "0.00"}`
          : `${numberToMoneyFormat(data[data?.length - 1]?.close) || "0.00"}`}
      </span>
      <span
        className={`flex-row flex items-center gap-1 ${subHeaderTailwindCss}`}
      >
        <TiArrowSortedUp />
        <RenderTooltipContent
          tooltipPayload={tooltipPayload}
          data={data}
          withYears={withYears}
          lineName={lineName}
        />
      </span>
      {/* <div className="flex items-center gap-2 ml-[0.1rem]">
        <p className={`w-[0.4rem] h-[0.4rem] rounded-full `}></p>
        <span className="text-xs">{lineName}</span>
      </div> */}
    </div>
  );
};

export default ValueAndPriceChange;
