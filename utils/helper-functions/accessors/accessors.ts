import {
  LineSeriesConfig,
  TimeSeriesData,
} from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";

/**
 * Extracts the date from a time series data point.
 * @param d - The time series data point
 * @returns The date of the data point
 */
export const getDate: (dataPoint: TimeSeriesData) => Date = (dataPoint: TimeSeriesData) =>
 dataPoint?.date;

/**
 * Safely extracts the value from a time series data point.
 * @param d - The time series data point
 * @returns The value of the data point, or undefined if the data point is nullish
 */
export const getStockValue = (dataPoint: TimeSeriesData) =>dataPoint?.value;

/**
 * Extracts the value from a time series data point.
 * @param dataPoint - The time series data point
 * @returns The value of the data point
 */
export const getValue = (dataPoint: TimeSeriesData | undefined ) => dataPoint?.value;

/**
 * Gets the first value from a line series configuration.
 * @param lineConfig - The line series configuration containing data points
 * @returns The value of the first data point in the series
 */
export const getStartValue = (lineConfig: LineSeriesConfig) => {
  const lineData = lineConfig.data;
  return lineData[0].value;
};

/**
 * Gets the end value from a line series, using the tooltip position if available.
 * @param lineConfig - The line series configuration containing data points
 * @param tooltipConfig - Optional tooltip configuration indicating the current hover position
 * @returns The value at the tooltip position if hovering, otherwise the last value in the series
 */
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

/**
 * Gets the first date from a line series configuration.
 * @param lineConfig - The line series configuration containing data points
 * @returns The date of the first data point in the series
 */
export const getStartDate = (lineConfig: LineSeriesConfig) => {
  const lineData = lineConfig.data;
  return lineData[0].date;
};

/**
 * Gets the end date from a line series, using the tooltip position if available.
 * @param lineConfig - The line series configuration containing data points
 * @param tooltipConfig - Optional tooltip configuration indicating the current hover position
 * @returns The date at the tooltip position if hovering, otherwise the last date in the series
 */
export const getEndDate = (
  lineConfig: LineSeriesConfig,
  tooltipConfig: TooltipConfig | null | undefined
) => {
  const lineData = lineConfig.data;
  return tooltipConfig
    ? tooltipConfig.lineDataPoint.date
    : lineData[lineData.length - 1].date;
};
