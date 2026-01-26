"use client";
import { cn } from "@/lib/utils";

// React
import { createContext, useContext } from "react";
import ValuePriceChangelabel from "@/components/dashboard/ValuePriceChangeLabel";

// Components
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import {
  HeaderTimeValueGraphProps,
  TitleProps,
  ValueProp,
  ValueChangeProps,
} from "@/types/components/admin/graphs/props";

// Functions
import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";
import { getStockValue } from "@/utils/helper-functions/accessors/accessors";
import { calculateRateOfChange } from "@/utils/helper-functions/graph/calculations/calculateRateOfChange";
import { calculateYearsBetween } from "@/utils/helper-functions/dates/calculateYearsBetween";


// Context
const TimeValueGraphHeaderContext = createContext<{
  lineConfigs: LineSeriesConfig[];
  tooltipData?: TooltipConfig[];
}>({
  lineConfigs: [],
  tooltipData: undefined,
});

/**
 *
 * Header for the time value graph.
 *
 * @returns {JSX.Element}
 */
const TimeValueGraphHeader = ({
  children,
  lineConfigs,
  tooltipData,
}: HeaderTimeValueGraphProps) => {
  return (
    <TimeValueGraphHeaderContext.Provider value={{ lineConfigs, tooltipData }}>
      {children}
    </TimeValueGraphHeaderContext.Provider>
  );
};

/**
 *  The title of the graph.
 *x
 * @param {children} - The children of the title.
 * @param {className} - The class name of the title.
 * @param {ref} - The ref of the title.
 *
 * @returns {JSX.Element}
 */
export function Title({ children, className, ref }: TitleProps) {
  const defaultClass =
    "tracking-wider font-medium text-tertiary-1000 not-italic text-[1.4rem]";
  return (
    <span className={cn(defaultClass, className)} ref={ref}>
      {children}
    </span>
  );
}

/**
 *
 * The value of the graph.
 *
 * @param param0
 * @returns
 */
export function Value({ className, lineIndex, ref }: ValueProp) {
  const defaultClass =
    "tracking-wider flex gap-2 items-center text-[1.4rem] font-medium text-tertiary-1000";

  const { lineConfigs, tooltipData } = useContext(TimeValueGraphHeaderContext);

  if (!lineConfigs) return null;

  const lineData = lineConfigs[lineIndex].data;
  const tooltipPayload = tooltipData?.[lineIndex];

  return (
    <span className={cn(defaultClass, className)} ref={ref}>
      {tooltipPayload
        ? `${numberToMoneyFormat(getStockValue(tooltipPayload.lineDataPoint))}`
        : `${numberToMoneyFormat(
            lineData?.[lineData?.length - 1]?.value ?? 0
          )}`}
    </span>
  );
}

/**
 * Shows the change in the value as well as the rate of change as a percentage.
 */
export function ValueChangeHeader({ className, lineIndex }: ValueChangeProps) {
  const { lineConfigs, tooltipData } = useContext(TimeValueGraphHeaderContext);

  if (!lineConfigs) return null;

  const lineData = lineConfigs[lineIndex].data;
  const tooltipPayload = tooltipData?.[lineIndex];

  if (!lineData) return null;

  const deafultStockValueDifference =
    lineData[lineData.length - 1].value - lineData[0].value;

  const defaultRateOfChange = calculateRateOfChange(
    lineData[0].value,
    lineData[lineData.length - 1].value
  );

  if (!tooltipPayload)
    return (
      <ValuePriceChangelabel
        valueDifference={deafultStockValueDifference}
        rateOfChange={defaultRateOfChange}
        className={className}
      />
    );

  const stockValueDifference =
    getStockValue(tooltipPayload.lineDataPoint) - lineData[0].value;

  const rateOfChange = calculateRateOfChange(
    lineData[0].value,
    getStockValue(tooltipPayload.lineDataPoint)
  );

  return (
    <ValuePriceChangelabel
      valueDifference={stockValueDifference}
      rateOfChange={rateOfChange}
      className={className}
    />
  );
}

/**
 * 
 *  The total years between the first and last data point of the line.
 * 
 * @param param0 
 * @returns 
 */
export function TotalYears({
  className,
  lineIndex,
}: {
  className?: string;
  lineIndex: number;
}) {
  const { lineConfigs, tooltipData } = useContext(TimeValueGraphHeaderContext);
  const tooltipPayload = tooltipData?.[lineIndex];


  const defaultClass = "text-tertiary-800 font-normal";

  if (!lineConfigs) return null;

  const lineData = lineConfigs[lineIndex].data;

  if (!lineData) return null;

  const years = calculateYearsBetween(
    lineData[0].date,
    tooltipPayload ? tooltipPayload.lineDataPoint.date : lineData[lineData.length - 1].date
  );

  return <span className={cn(defaultClass, className)}>{years} years</span>;
}


export function Info(){

}

TimeValueGraphHeader.Title = Title;
TimeValueGraphHeader.Value = Value;
TimeValueGraphHeader.ValueChangeHeader = ValueChangeHeader;
TimeValueGraphHeader.TotalYears = TotalYears;

export default TimeValueGraphHeader;
