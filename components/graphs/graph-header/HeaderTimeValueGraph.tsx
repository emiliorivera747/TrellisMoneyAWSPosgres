"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

// Components
import ValuePriceChangeLabel from "@/components/graphs/primary-time-value-graph/ValuePriceChangeLabel";
import GraphHeader from "@/components/headers/GraphHeader";
import GraphFilterButtonWithModal from "@/components/buttons/GraphFilterButtonWithModal";

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
import { getDirectionalColorsByLineConfig } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";

// Types
import {
  HeaderTimeValueGraphProps,
  TitleProps,
  GraphSummaryHeaderContextVal,
  GraphSummaryHeaderHeaderProps,
  GraphSummaryHeaderFilterButtonProps,
  ValueHeaderProps,
} from "@/types/components/admin/graphs/props";

/** Context for providing graph configurations to child components. */
const GraphSummaryHeaderContext = createContext<GraphSummaryHeaderContextVal>({
  graphConfigs: [],
});

/**
 * Hook to access graph configurations from GraphSummaryHeaderContext.
 */
export function useGraphSummaryHeader() {
  return useContext(GraphSummaryHeaderContext);
}

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
 * Renders a grid of graph configuration summaries from the GraphSummaryHeaderContext.
 * Each summary displays the current value and value change with duration.
 */
export function GraphConfigSummaryList({ className }: { className?: string }) {
  const { graphConfigs } = useGraphSummaryHeader();
  const defaultClassName = "grid grid-cols-[16rem_16rem]";
  return (
    <div className={cn(defaultClassName, className)}>
      {graphConfigs.map((graphConfig, index) => (
        <div key={index} className="flex flex-col">
          <Value
            graphConfig={graphConfig}
            className={`${graphConfigs.length > 1 ? "text-[1.2rem]" : ""}`}
          />
          <ValueChangeWithYears graphConfig={graphConfig} />
        </div>
      ))}
    </div>
  );
}

/**
 * Displays the current value of the graph line.
 */
export function Value({ graphConfig, className }: ValueHeaderProps) {
  const defaultClass =
    "tracking-wider flex gap-2 items-center text-[1.4rem] font-medium text-tertiary-1000";
  const { lineConfig, tooltipConfig } = graphConfig;
  if (!lineConfig || !lineConfig.data) return null;

  const endValue = getEndValue(lineConfig, tooltipConfig);
  const currentValue = tooltipConfig?.lineDataPoint;

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
  graphConfig,
  className,
  style,
}: ValueHeaderProps) {
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
 * Displays a compact summary of value change and time duration for a graph configuration.
 * Combines the ValueChange and TotalYears components in a horizontal layout.
 * Uses directional coloring based on whether the value increased or decreased.
 */
export function ValueChangeWithYears({
  className,
  graphConfig,
}: ValueHeaderProps) {
  const { lineConfig } = graphConfig;
  const { primaryTextColor } = getDirectionalColorsByLineConfig(lineConfig);
  const defaultClass = "flex gap-1";
  return (
    <span className={cn(defaultClass, className)}>
      <ValueChange
        graphConfig={graphConfig}
        className="text-[0.7rem]"
        style={{ color: primaryTextColor }}
      />
      <TotalYears graphConfig={graphConfig} className="text-[0.7rem]" />
    </span>
  );
}

/**
 * Displays the total years between the first and last data point of the line.
 */
export function TotalYears({ graphConfig, className }: ValueHeaderProps) {
  const defaultClass = "text-tertiary-800 font-normal";
  const { lineConfig, tooltipConfig } = graphConfig;
  if (!lineConfig || !lineConfig.data) return null;

  const startDate = getStartDate(lineConfig);
  const endDate = getEndDate(lineConfig, tooltipConfig);
  const years = calculateYearsBetween(startDate, endDate);

  return <span className={cn(defaultClass, className)}>{years} years</span>;
}

/**
 * Displays the header label for the graph.
 * Wraps the GraphHeader component for use within GraphSummaryHeader.
 */
export function Header({
  label,
  className,
  ref,
}: GraphSummaryHeaderHeaderProps) {
  return <GraphHeader label={label} className={className} ref={ref} />;
}

/**
 * Renders a filter button that opens a modal with filter options.
 * Wraps the GraphFilterButtonWithModal component for use within GraphSummaryHeader.
 */
export function FilterButton({
  filterConfig,
  filterRef,
  className,
}: GraphSummaryHeaderFilterButtonProps) {
  return (
    <GraphFilterButtonWithModal
      filterConfig={filterConfig}
      innerRef={filterRef}
      className={className}
    />
  );
}

GraphSummaryHeader.Title = Title;
GraphSummaryHeader.Value = Value;
GraphSummaryHeader.ValueChange = ValueChange;
GraphSummaryHeader.TotalYears = TotalYears;
GraphSummaryHeader.ConfigSummaryList = GraphConfigSummaryList;
GraphSummaryHeader.ValueChangeWithYears = ValueChangeWithYears;
GraphSummaryHeader.Header = Header;
GraphSummaryHeader.FilterButton = FilterButton;

export default GraphSummaryHeader;
