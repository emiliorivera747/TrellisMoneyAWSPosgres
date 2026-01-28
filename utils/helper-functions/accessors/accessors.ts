import {
  LineSeriesConfig,
  TimeSeriesData,
} from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";

export const getDate: (d: TimeSeriesData) => Date = (d: TimeSeriesData) =>
  d?.date;

export const getStockValue = (d: TimeSeriesData) => d?.value;

export const getStartValue = (lineConfig: LineSeriesConfig) => {
  const lineData = lineConfig.data;
  return lineData[0].value;
};

export const getEndValue = (
  lineConfig: LineSeriesConfig,
  tooltipConfig: TooltipConfig | null | undefined
) => {
  const lineData = lineConfig.data;
  const endValue = tooltipConfig
    ? getStockValue(tooltipConfig.lineDataPoint)
    : lineData[lineData.length - 1].value;
  return endValue;
};

export const getStartDate = (lineConfig: LineSeriesConfig) => {
  const lineData = lineConfig.data;
  return lineData[0].date;
};

export const getEndDate = (
  lineConfig: LineSeriesConfig,
  tooltipConfig: TooltipConfig | null | undefined
) => {
  const lineData = lineConfig.data;
  return tooltipConfig
    ? tooltipConfig.lineDataPoint.date
    : lineData[lineData.length - 1].date;
};
