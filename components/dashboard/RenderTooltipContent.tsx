import React from "react";
import { RenderTooltipContentProps } from "@/features/projected-net-worth/types/tooltips";

// functions
import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";
import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import { calculateRateOfChange } from "@/utils/helper-functions/graph/calculations/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/dates/calculateYearsBetween";

/**
 *  Render the tooltip content
 *
 * @param param0
 * @returns
 */
const RenderTooltipContent: React.FC<RenderTooltipContentProps> = ({
  tooltipPayload,
  data,
  withYears = true,
}) => {
  
  if (!data || data.length === 0) return null;

  const deafultStockValueDifference =
    data[data.length - 1].value - data[0].value;

  const defaultRateOfChange = calculateRateOfChange(
    data[0].value,
    data[data.length - 1].value
  );

  /**
   * If there is no tooltip data, return the default stock value difference and rate of change
   */
  if (!tooltipPayload) {
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

  const stockValueDifference = getStockValue(tooltipPayload.lineDataPoint) - data[0].value;
  const rateOfChange = calculateRateOfChange(
    data[0].value,
    getStockValue(tooltipPayload.lineDataPoint)
  );

  const yearsBetween = calculateYearsBetween(
    data[0].date,
    tooltipPayload.lineDataPoint.date
  );

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
