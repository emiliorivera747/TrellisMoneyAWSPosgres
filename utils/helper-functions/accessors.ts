import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { TimeSeriesData } from "@/types/graphs";
export const getDate: (d: TimeSeriesData) => Date = (d: TimeSeriesData) =>
  d?.date;

export const getStockValue = (d: TimeSeriesData) => d?.close;
