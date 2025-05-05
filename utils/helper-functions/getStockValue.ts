import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
/**
 *  Get the stock value from the data
 *
 * @param data
 * @returns
 */
export const getStockValue = (data: SecurityData): number => {
  return data.close;
};
