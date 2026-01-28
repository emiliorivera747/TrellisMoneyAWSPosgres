"use client";

import { createContext } from "react";
import { cn } from "@/lib/utils";

// Components
import ValuePriceChangeLabel from "@/components/dashboard/ValuePriceChangeLabel";
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import {
  HeaderTimeValueGraphProps,
  TitleProps,
  ValueProp,
  ValueChangeProps,
  TotalYearsProps,
} from "@/types/components/admin/graphs/props";

// Utils
import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";
import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import { calculateRateOfChange } from "@/utils/helper-functions/graph/calculations/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/dates/calculateYearsBetween";
import {
  getStartValue,
  getEndValue,
} from "@/utils/helper-functions/accessors/accessors";

const GraphSummaryHeaderContext = createContext<{
  lineConfigs: LineSeriesConfig[];
  tooltipConfigs?: TooltipConfig[];
}>({
  lineConfigs: [],
  tooltipConfigs: undefined,
});

/**
 * Context provider for graph summary header components.
 * Provides line and tooltip data to child components.
 */
const GraphSummaryHeader = ({
  children,
  lineConfigs,
  tooltipConfigs,
}: HeaderTimeValueGraphProps) => {
  return (
    <GraphSummaryHeaderContext.Provider value={{ lineConfigs, tooltipConfigs }}>
      {children}
    </GraphSummaryHeaderContext.Provider>
  );
};

/**
 * Displays the title of the graph.
 */
export function Title({ children, className }: TitleProps) {
  const defaultClass =
    "tracking-wider font-medium text-tertiary-1000 not-italic text-[1.4rem]";
  return <span className={cn(defaultClass, className)}>{children}</span>;
}

/**
 * Displays the current value of the graph line.
 */
export function Value({ className, lineConfig, tooltipConfig }: ValueProp) {
  const defaultClass =
    "tracking-wider flex gap-2 items-center text-[1.4rem] font-medium text-tertiary-1000";

  if (!lineConfig) return null;
  const lineData = lineConfig.data;

  return (
    <span className={cn(defaultClass, className)}>
      {tooltipConfig
        ? `${numberToMoneyFormat(getStockValue(tooltipConfig.lineDataPoint))}`
        : `${numberToMoneyFormat(
            lineData?.[lineData?.length - 1]?.value ?? 0
          )}`}
    </span>
  );
}

/**
 * Displays the change in value and rate of change as a percentage.
 */
export function ValueChange({
  className,
  lineConfig,
  tooltipConfig,
  style,
}: ValueChangeProps) {
  if (!lineConfig || !tooltipConfig) return null;
  const startValue = getStartValue(lineConfig);
  const endValue = getEndValue(lineConfig, tooltipConfig);
  const diff = endValue - startValue;
  const rateOfChange = calculateRateOfChange(startValue, endValue);
  return (
    <ValuePriceChangeLabel
      valueDifference={diff}
      rateOfChange={rateOfChange}
      className={className}
      style={style}
    />
  );
}

/**
 * Displays the total years between the first and last data point of the line.
 */
export function TotalYears({
  className,
  lineConfig,
  tooltipConfig,
}: TotalYearsProps) {
  const defaultClass = "text-tertiary-800 font-normal";

  if (!lineConfig) return null;
  const lineData = lineConfig.data;
  if (!lineData) return null;

  const years = calculateYearsBetween(
    lineData[0].date,
    tooltipConfig
      ? tooltipConfig.lineDataPoint.date
      : lineData[lineData.length - 1].date
  );

  return <span className={cn(defaultClass, className)}>{years} years</span>;
}

GraphSummaryHeader.Title = Title;
GraphSummaryHeader.Value = Value;
GraphSummaryHeader.ValueChange = ValueChange;
GraphSummaryHeader.TotalYears = TotalYears;

export default GraphSummaryHeader;
