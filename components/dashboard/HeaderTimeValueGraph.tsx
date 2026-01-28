"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import {
  HeaderTimeValueGraphProps,
  TitleProps,
  ValueProp,
  ValueChangeProps,
  TotalYearsProps,
} from "@/types/components/admin/graphs/props";

import ValuePriceChangeLabel from "@/components/dashboard/ValuePriceChangeLabel";
import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";
import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import { calculateRateOfChange } from "@/utils/helper-functions/graph/calculations/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/dates/calculateYearsBetween";

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
export function Value({ className, lineIndex }: ValueProp) {
  const defaultClass =
    "tracking-wider flex gap-2 items-center text-[1.4rem] font-medium text-tertiary-1000";
  const { lineConfigs, tooltipConfigs } = useContext(GraphSummaryHeaderContext);

  if (!lineConfigs) return null;

  const lineData = lineConfigs[lineIndex].data;
  const tooltipPayload = tooltipConfigs?.[lineIndex];

  return (
    <span className={cn(defaultClass, className)}>
      {tooltipPayload
        ? `${numberToMoneyFormat(getStockValue(tooltipPayload.lineDataPoint))}`
        : `${numberToMoneyFormat(
            lineData?.[lineData?.length - 1]?.value ?? 0
          )}`}
    </span>
  );
}

/**
 * Displays the change in value and rate of change as a percentage.
 */
export function ValueChange({ className, lineIndex, style }: ValueChangeProps) {
  const { lineConfigs, tooltipConfigs } = useContext(GraphSummaryHeaderContext);

  if (!lineConfigs) return null;

  const lineData = lineConfigs[lineIndex].data;
  if (!lineData) return null;

  const tooltipPayload = tooltipConfigs?.[lineIndex];
  const startValue = lineData[0].value;
  const endValue = tooltipPayload
    ? getStockValue(tooltipPayload.lineDataPoint)
    : lineData[lineData.length - 1].value;

  const valueDifference = endValue - startValue;
  const rateOfChange = calculateRateOfChange(startValue, endValue);

  return (
    <ValuePriceChangeLabel
      valueDifference={valueDifference}
      rateOfChange={rateOfChange}
      className={className}
      style={style}
    />
  );
}

/**
 * Displays the total years between the first and last data point of the line.
 */
export function TotalYears({ className, lineIndex }: TotalYearsProps) {
  const { lineConfigs, tooltipConfigs } = useContext(GraphSummaryHeaderContext);
  const tooltipPayload = tooltipConfigs?.[lineIndex];
  const defaultClass = "text-tertiary-800 font-normal";

  if (!lineConfigs) return null;
  const lineData = lineConfigs[lineIndex].data;
  if (!lineData) return null;

  const years = calculateYearsBetween(
    lineData[0].date,
    tooltipPayload
      ? tooltipPayload.lineDataPoint.date
      : lineData[lineData.length - 1].date
  );

  return <span className={cn(defaultClass, className)}>{years} years</span>;
}

GraphSummaryHeader.Title = Title;
GraphSummaryHeader.Value = Value;
GraphSummaryHeader.ValueChange = ValueChange;
GraphSummaryHeader.TotalYears = TotalYears;

export default GraphSummaryHeader;
