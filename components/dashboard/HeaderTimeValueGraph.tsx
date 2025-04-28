"use client";

// React
import React, { createContext, ReactNode } from "react";

// Components
import { HeaderTimeValueGraphProps } from "@/types/graphs";

// Context
const HeaderTimeValueGraphHeader = createContext({
  linePayloads: [
    {
      id: "",
      dataKey: "",
      colorConfig: {
        lineColor: "",
        tagTextColor: "",
        tagBgColor: "",
        subheaderColor: "",
      },
      strokeWidth: 0,
      value: "",
    },
  ],
  tooltipData: [
    {
      name: "",
      value: "",
      color: "",
      payload: {
        name: "",
        value: "",
        color: "",
      },
    },
  ],
});

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

export default HeaderTimeValueGraph;
