import { getStockValue } from "@/utils/helper-functions/accessors";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";
import { TimeSeriesData } from "@/types/graphs";

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
  
  if (!data || data?.length < 2 ) return "flat";
  
  const initialStockValue = getStockValue(data[0]);
  const lastStockValue = getStockValue(data[data?.length - 1]);

  if (initialStockValue < lastStockValue) {
    return "up";
  } else if (initialStockValue > lastStockValue) {
    return "down";
  }
  return "flat";
};
