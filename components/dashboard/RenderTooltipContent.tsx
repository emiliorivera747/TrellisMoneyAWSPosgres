import React from "react";
import { RenderTooltipContentProps } from "@/features/projected-net-worth/types/tooltips";

// functions
import numberToMoneyFormat from "@/utils/helper-functions/numberToMoneyFormat";
import { getStockValue } from "@/utils/helper-functions/accessors";
import { calculateRateOfChange } from "@/utils/helper-functions/calculateRateOfChange";

/**
 *  Render the tooltip content
 *
 * @param param0
 * @returns
 */
const RenderTooltipContent: React.FC<RenderTooltipContentProps> = ({
  tooltipPayload,
  data,
}) => {
  if (!data || data.length === 0) return null;

  const deafultStockValueDifference =
    data[data.length - 1].close - data[0].close;

  const defaultRateOfChange = calculateRateOfChange(
    data[0].close,
    data[data.length - 1].close
  );

  /**
   * If there is no tooltip data, return the default stock value difference and rate of change
   */
  if (!tooltipPayload) {
    return (
      <ValuePriceChangeLabel
        valueDifference={deafultStockValueDifference}
        rateOfChange={defaultRateOfChange}
      />
    );
  }

  const valueDifference = getStockValue(tooltipPayload.d) - data[0].close;
  const rateOfChange = calculateRateOfChange(
    data[0].close,
    getStockValue(tooltipPayload.d)
  );


  return (
    <ValuePriceChangeLabel
      valueDifference={valueDifference}
      rateOfChange={rateOfChange}
    />
  );
};

export default RenderTooltipContent;



interface ValuePriceChangeLabelProps {
  /**
   * The difference in value
   */
  valueDifference: number;
  /**
   * The rate of change
   */
  rateOfChange: number;
}

/**
 *  Render the value price change label
 *
 * @param param0
 * @returns
 */
const ValuePriceChangeLabel = ({
  valueDifference,
  rateOfChange,
}: ValuePriceChangeLabelProps) => {
  return (
    <>
      {numberToMoneyFormat(valueDifference) +
        " (" +
        rateOfChange.toFixed(2) +
        "%) "}
    </>
  );
};
