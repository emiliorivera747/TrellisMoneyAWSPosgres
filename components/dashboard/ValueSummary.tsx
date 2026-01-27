import { TiArrowSortedUp } from "react-icons/ti";
import RenderTooltipContent from "@/components/dashboard/RenderTooltipContent";

// Functions
import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";

import { ValueSummaryProps } from "@/types/components/admin/graphs/props";

const ValueSummary = ({
  tooltipPayload,
  data,
  withYears = true,
  mainHeaderTailwindCss = "text-foreground text-[1.4rem] font-medium",
  subHeaderTailwindCss = "",
  subHeaderStyle,
  lineName = "",
}: ValueSummaryProps) => {
  if (!data) return null;

  const rawValue = tooltipPayload
    ? getStockValue(tooltipPayload.lineDataPoint)
    : data[data.length - 1]?.value;

  const displayValue = numberToMoneyFormat(rawValue) || "0.00";

  return (
    <div className="flex flex-col min-w-[15.5rem] w-auto">
      <span
        className={`tracking-wider flex gap-2 items-center ${mainHeaderTailwindCss}`}
      >
        {displayValue}
      </span>
      <span
        className={`flex flex-row items-center gap-1 ${subHeaderTailwindCss}`}
        style={subHeaderStyle}
      >
        <TiArrowSortedUp />
        <RenderTooltipContent
          tooltipPayload={tooltipPayload}
          data={data}
          withYears={withYears}
          lineName={lineName}
        />
      </span>
    </div>
  );
};

export default ValueSummary;
