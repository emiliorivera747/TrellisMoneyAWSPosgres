import { TimeSeriesData } from "@/types/components/admin/graphs/graphs";

export const getDate: (d: TimeSeriesData) => Date = (d: TimeSeriesData) =>
  d?.date;

export const getStockValue = (d: TimeSeriesData) => d?.close;
