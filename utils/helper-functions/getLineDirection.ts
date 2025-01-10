import { getStockValue } from "@/utils/helper-functions/accessors";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";
export const getLineDirection = (data: SecurityData[]): Direction => {
  if (data.length < 2) {
    return "flat";
  }

  const firstValue = getStockValue(data[0]);
  const lastValue = getStockValue(data[data.length - 1]);

  if (firstValue < lastValue) {
    return "up";
  } else if (firstValue > lastValue) {
    return "down";
  }
  return "flat";
};
