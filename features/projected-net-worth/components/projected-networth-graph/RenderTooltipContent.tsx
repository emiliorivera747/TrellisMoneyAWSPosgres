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
  return endDate.getFullYear() - startDate.getFullYear();
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
  if (!tooltipData) {
    return (
      <>
        {numberToMoneyFormat(deafultStockValueDifference) +
          " (" +
          defaultRateOfChange.toFixed(2) +
          "%)"}
        <span className="text-tertiary-800 font-normal ">
          {calculateYearsBetween(data[0].year, data[data.length - 1].year) +
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
    tooltipData.year.getFullYear() - data[0].year.getFullYear();

  return (
    <>
      {
        numberToMoneyFormat(stockValueDifference) +
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
