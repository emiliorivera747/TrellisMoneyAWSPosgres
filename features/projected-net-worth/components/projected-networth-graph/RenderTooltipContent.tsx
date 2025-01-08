import React from "react";
import { RenderTooltipContentProps } from "@/features/projected-net-worth/types/graphComponents";

// functions
import numberToMoneyFormat from "@/utils/helper-functions/numberToMoneyFormat";
import { getStockValue } from "@/utils/helper-functions/accessors";
import { calculateRateOfChange } from "@/utils/helper-functions/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/calculateYearsBetween";

/**
 *  Render the tooltip content
 *
 * @param param0
 * @returns
 */
const RenderTooltipContent: React.FC<RenderTooltipContentProps> = ({
  tooltipData,
  data,
  withYears = true,
}) => {
  const deafultStockValueDifference =
    data[data.length - 1].close - data[0].close;

  const defaultRateOfChange = calculateRateOfChange(
    data[0].close,
    data[data.length - 1].close
  );

  /**
   * If there is no tooltip data, return the default stock value difference and rate of change
   */
  if (!tooltipData) {
    return (
      <>
        {numberToMoneyFormat(deafultStockValueDifference) +
          " (" +
          defaultRateOfChange.toFixed(2) +
          "%)"}
        {withYears && (
          <span className="text-tertiary-800 font-normal ">
            {calculateYearsBetween(data[0].date, data[data.length - 1].date) +
              " years"}
          </span>
        )}
      </>
    );
  }

  const stockValueDifference = getStockValue(tooltipData) - data[0].close;

  const rateOfChange = calculateRateOfChange(
    data[0].close,
    getStockValue(tooltipData)
  );

  const yearsBetween = calculateYearsBetween(data[0].date, tooltipData.date);

  return (
    <>
      {numberToMoneyFormat(stockValueDifference) +
        " (" +
        rateOfChange.toFixed(2) +
        "%) "}
      {withYears && (
        <span className="text-tertiary-800 font-normal ">
          {yearsBetween + " years"}
        </span>
      )}
    </>
  );
};

export default RenderTooltipContent;
