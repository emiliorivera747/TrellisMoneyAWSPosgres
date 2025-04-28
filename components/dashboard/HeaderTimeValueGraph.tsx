"use client";
import { cn } from "@/lib/utils";

// React
import React, { createContext, useContext } from "react";

// Components
import {
  HeaderTimeValueGraphProps,
  TitleProps,
  ValueProp,
} from "@/types/graphs";

// Functions
import numberToMoneyFormat from "@/utils/helper-functions/numberToMoneyFormat";
import { getStockValue } from "@/utils/helper-functions/accessors";

// Types
import { LinePayload } from "@/types/graphs";

// Context
const TimeValueGraphHeaderContext = createContext<{
  linePayloads: { value: number; data: any[] }[];
  tooltipData?: any;
}>({
  linePayloads: [],
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
  linePayloads,
  tooltipData,
}: HeaderTimeValueGraphProps) => {
  return (
    <TimeValueGraphHeaderContext.Provider value={{ linePayloads, tooltipData }}>
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
  const defaultClass = "tracking-wider flex gap-2 items-center text-[1.4rem] font-medium text-tertiary-1000";

  const { linePayloads, tooltipData } = useContext(TimeValueGraphHeaderContext);

  if (!linePayloads) return null;

  const lineData = linePayloads?.[lineIndex]?.data;
  const tooltipPayload = tooltipData?.[lineIndex];

  console.log("lineData", lineData?.length);

  return (
    <span className={cn(defaultClass, className)} ref={ref}>
      {tooltipPayload
        ? `${numberToMoneyFormat(getStockValue(tooltipPayload.d))}`
        : `${numberToMoneyFormat(
            lineData?.[lineData?.length - 1]?.close ?? 0
          )}`}
    </span>
  );
}

TimeValueGraphHeader.Title = Title;
TimeValueGraphHeader.Value = Value;

export default TimeValueGraphHeader;
