import React from "react";
import { Line } from "@visx/shape";
import { TooltipProps } from "@/types/components/admin/graphs/tooltips";

//Accessors
import { getStockValue } from "@/utils/helper-functions/accessors/accessors";

//Functions
import { getTailwindColors } from "@/features/projected-net-worth/utils/graph-helpers/getTailwindColors";

/**
 * Component for displaying a tooltip bar on a graph.
 */
const TooltipBar = ({
  tooltipLeft,
  margin,
  innerHeight,
  tooltipConfigs,
  stockValueScale,
  directions,
}: TooltipProps) => {
  return (
    <g>
      <Line
        from={{ x: tooltipLeft, y: margin.top + 54 }}
        to={{ x: tooltipLeft, y: innerHeight + margin.top }}
        stroke={"var(--tertiary-700)"}
        strokeWidth={0.5}
        strokeDasharray="6,6" // Reduced the gap between dashes
        pointerEvents="none"
      />

      {tooltipConfigs.map((linePayload, i) => {
        const { lineColor } = getTailwindColors(
          directions[i],
          linePayload.lineConfig
        );

        return (
          <circle
            key={i}
            cx={tooltipLeft}
            cy={stockValueScale(getStockValue(linePayload.lineDataPoint))}
            r={4.5}
            stroke={lineColor}
            fill="var(--tertiary-100)"
            strokeWidth={2.5}
            pointerEvents="none"
          />
        );
      })}
    </g>
  );
};

export default TooltipBar;
