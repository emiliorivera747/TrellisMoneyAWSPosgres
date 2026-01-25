import { TimeSeriesData } from "@/types/components/admin/graphs/data";

export const getDate: (d: TimeSeriesData) => Date = (d: TimeSeriesData) =>
  d?.date;

export const getStockValue = (d: TimeSeriesData) => d?.value;
