import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { TimeSeriesData } from "@/types/components/admin/graphs/data";

/**
 * Determines the line direction ("up", "down", "flat") based on the first and last stock values.
 *
 * @param data - Time series data
 * @returns Direction of the line
 */
export const getLineDirection = (data: TimeSeriesData[]): Direction => {
  const len = data?.length;
  if (!data || len < 2) return "flat";

  const startValue = getStockValue(data[0]);
  const endValue = getStockValue(data[len - 1]);

  if (startValue < endValue) return "up";
  if (startValue > endValue) return "down";
  return "flat";
};
