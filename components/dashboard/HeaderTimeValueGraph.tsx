"use client";
import { cn } from "@/lib/utils";

// React
import React, { createContext, ReactNode } from "react";

// Components
import { HeaderTimeValueGraphProps } from "@/types/graphs";

// Context
const HeaderTimeValueGraphHeader = createContext({});

/**
 *
 * Header for the time value graph.
 *
 * @returns {JSX.Element}
 */
const HeaderTimeValueGraph = ({
  children,
  linePayloads,
  tooltipData,
}: HeaderTimeValueGraphProps) => {
  return (
    <HeaderTimeValueGraphHeader.Provider value={{ linePayloads, tooltipData }}>
      {children}
    </HeaderTimeValueGraphHeader.Provider>
  );
};

HeaderTimeValueGraph.Title = function Title({
  children,
  className,
  ref,
}: {
  children: ReactNode;
  className?: string;
  ref?: React.Ref<HTMLButtonElement | HTMLDivElement>;
}) {
  const defaultClass =
    "tracking-wider font-medium text-tertiary-100 not-italic text-[1.4rem]";
  return (
    <span className={cn(defaultClass, className)} ref={ref}>
      {children}
    </span>
  );
};

export default HeaderTimeValueGraph;
