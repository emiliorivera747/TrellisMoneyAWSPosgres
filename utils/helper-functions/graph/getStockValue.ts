import { TimeSeriesData } from "@/types/components/admin/graphs/data";
/**
 *  Get the stock value from the data
 *
 * @param data
 * @returns
 */
export const getStockValue = (data: TimeSeriesData): number => {
  return data.value;
};
