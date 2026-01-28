import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { TimeSeriesData } from "@/types/components/admin/graphs/data";

/**
 * Get the direction of the line by comparing the first and last stock value
 * - If initial stock value is less than the last stock value, return "up" (increasing)
 * - If initial stock value is greater than the last stock value, return "down" (decreasing)
 * - If initial stock value is equal to the last stock value, return "flat" (no change)
 *
 * @param data
 * @returns
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
