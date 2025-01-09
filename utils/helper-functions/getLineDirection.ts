import { getStockValue } from "@/utils/helper-functions/accessors";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";

export const getLineDirection = (data: SecurityData[]) => {
  if (data.length < 2) {
    return "flat";
  }

  const firstValue = getStockValue(data[0]);
  const lastValue = getStockValue(data[data.length - 1]);
  console.log("firstValue", firstValue, "lastValue", lastValue);
  if (firstValue < lastValue) {
    return "up";
  } else if (firstValue > lastValue) {
    return "down";
  }
  return "flat";
};
