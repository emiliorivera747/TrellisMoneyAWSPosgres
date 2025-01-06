import React from "react";
import {
  SecurityData,
  RenderTooltipContentProps,
} from "@/features/projected-net-worth/types/graphComponents";

import numberToMoneyFormat from "@/utils/helper-functions/numberToMoneyFormat";

const getStockValue = (data: SecurityData): number => {
  return data.close;
};

const calculateRateOfChange = (
  initialValue: number,
  finalValue: number
): number => {
  return ((finalValue - initialValue) / initialValue) * 100;
};

const calculateYearsBetween = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();

  if (years < 0) {
    years = new Date().getFullYear();
  }

  return years;
};

const RenderTooltipContent: React.FC<RenderTooltipContentProps> = ({
  tooltipData,
  data,
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
        <span className="text-tertiary-800 font-normal ">
          {calculateYearsBetween(data[0].date, data[data.length - 1].date) +
            " years"}
        </span>
      </>
    );
  }

  const stockValueDifference = getStockValue(tooltipData) - data[0].close;

  const rateOfChange = calculateRateOfChange(
    data[0].close,
    getStockValue(tooltipData)
  );

  const yearsBetween =
    new Date(tooltipData.date).getFullYear() -
    new Date(data[0].date).getFullYear();

  return (
    <>
      {numberToMoneyFormat(stockValueDifference) +
        " (" +
        rateOfChange.toFixed(2) +
        "%) "}
      <span className="text-tertiary-800 font-normal ">
        {yearsBetween + " years"}
      </span>
    </>
  );
};

export default RenderTooltipContent;
