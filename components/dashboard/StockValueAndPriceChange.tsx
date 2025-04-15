import React from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import RenderTooltipContent from "@/components/dashboard/RenderTooltipContent";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// functions
import { getStockValue } from "@/utils/helper-functions/accessors";
import numberToMoneyFormat from "@/utils/helper-functions/numberToMoneyFormat";

import { TooltipPayload } from "@/types/graphs";

const StockValueAndPriceChange = ({
  tooltipPayload,
  data,
  withYears = true,
  mainHeaderTailwindCss = "text-zinc-800 text-[1.4rem] font-medium ",
  subHeaderTailwindCss = "text-secondary-900",
  withInfo = false,
}: {
  tooltipPayload: TooltipPayload | null;
  data: SecurityData[];
  withYears?: boolean;
  mainHeaderTailwindCss?: string;
  subHeaderTailwindCss?: string;
  withInfo?: boolean;
}) => {
  return (
    <div className="flex flex-col min-w-[15.5rem] w-auto ">
      <span
        className={`tracking-wider ${mainHeaderTailwindCss} flex gap-2 items-center `}
      >
        {tooltipPayload
          ? `${numberToMoneyFormat(getStockValue(tooltipPayload.d)) || "0.00"}`
          : `${numberToMoneyFormat(data[data.length - 1]?.close) || "0.00"}`}

      </span>
      <span
        className={`flex-row flex items-center gap-1 ${subHeaderTailwindCss}`}
      >
        <TiArrowSortedUp />
        <RenderTooltipContent
          tooltipPayload={tooltipPayload}
          data={data}
          withYears={withYears}
        />
      </span>
    </div>
  );
};

export default StockValueAndPriceChange;
