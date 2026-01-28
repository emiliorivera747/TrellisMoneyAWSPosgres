"use client";

import { createContext } from "react";
import { cn } from "@/lib/utils";

// Components
import ValuePriceChangeLabel from "@/components/graphs/primary-time-value-graph/ValuePriceChangeLabel";

// Utils
import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";
import {
  getEndDate,
  getStartDate,
  getValue,
} from "@/utils/helper-functions/accessors/accessors";
import { calculateRateOfChange } from "@/utils/helper-functions/graph/calculations/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/dates/calculateYearsBetween";
import {
  getStartValue,
  getEndValue,
} from "@/utils/helper-functions/accessors/accessors";

// Types
import { GraphConfig } from "@/types/components/admin/graphs/graph-config";
import {
  HeaderTimeValueGraphProps,
  TitleProps,
  ValueProp,
  ValueChangeProps,
  TotalYearsProps,
} from "@/types/components/admin/graphs/props";

const GraphSummaryHeaderContext = createContext<{
  graphConfigs: GraphConfig[];
}>({
  graphConfigs: [],
});

/**
 * Context provider for graph summary header components.
 * Provides unified graph configuration to child components.
 */
const GraphSummaryHeader = ({
  children,
  graphConfigs,
}: HeaderTimeValueGraphProps) => {
  return (
    <GraphSummaryHeaderContext.Provider value={{ graphConfigs }}>
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
export function Value({ className, graphConfig }: ValueProp) {
  const { lineConfig, tooltipConfig } = graphConfig;
  const defaultClass =
    "tracking-wider flex gap-2 items-center text-[1.4rem] font-medium text-tertiary-1000";
  if (!lineConfig || !lineConfig.data) return null;
  const endValue = getEndValue(lineConfig, tooltipConfig);
  let currentValue = tooltipConfig?.lineDataPoint;

  return (
    <span className={cn(defaultClass, className)}>
      {tooltipConfig
        ? `${numberToMoneyFormat(getValue(currentValue) ?? 0)}`
        : `${numberToMoneyFormat(endValue)}`}
    </span>
  );
}

/**
 * Displays the change in value and rate of change as a percentage.
 */
export function ValueChange({
  className,
  graphConfig,
  style,
}: ValueChangeProps) {
  const { lineConfig, tooltipConfig } = graphConfig;
  if (!lineConfig || !lineConfig.data) return null;

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
  graphConfig,
}: TotalYearsProps) {
  const { lineConfig, tooltipConfig } = graphConfig;
  const defaultClass = "text-tertiary-800 font-normal";

  if (!lineConfig || !lineConfig.data) return null;
  const startDate = getStartDate(lineConfig);
  const endDate = getEndDate(lineConfig, tooltipConfig);
  const years = calculateYearsBetween(startDate, endDate);
  return <span className={cn(defaultClass, className)}>{years} years</span>;
}

GraphSummaryHeader.Title = Title;
GraphSummaryHeader.Value = Value;
GraphSummaryHeader.ValueChange = ValueChange;
GraphSummaryHeader.TotalYears = TotalYears;

export default GraphSummaryHeader;
