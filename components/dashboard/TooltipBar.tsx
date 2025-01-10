import React from "react";
import { Line } from "@visx/shape";
import { TooltipProps } from "@/types/graphs";
import { getStockValue } from "@/utils/helper-functions/accessors";

/**
 * Component for displaying a tooltip bar on a graph.
 */
const TooltipBar = ({
  tooltipLeft,
  margin,
  innerHeight,
  tooltipData,
  stockValueScale,
}: TooltipProps) => {

  return (
    <g>
      <Line
        from={{ x: tooltipLeft, y: margin.top + 54 }}
        to={{ x: tooltipLeft, y: innerHeight + margin.top }}
        stroke={"#868e96"} // Changed the line color to red
        strokeWidth={0.4}
        pointerEvents="none"
      />

      {tooltipData.map((linePayload, i) => {
        return (
          <circle
            key={i}
            cx={tooltipLeft}
            cy={stockValueScale(getStockValue(linePayload.d))}
            r={4.5}
            stroke={linePayload.color}
            fill="white"
            strokeWidth={2.5}
            pointerEvents="none"
          />
        );
      })}
    </g>
  );
};

export default TooltipBar;
