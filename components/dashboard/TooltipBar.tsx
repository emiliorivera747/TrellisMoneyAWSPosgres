import React from "react";
import { Line } from "@visx/shape";
import { TooltipProps } from "@/types/graphs";

//Accessors
import { getStockValue } from "@/utils/helper-functions/accessors";

//Functions
import { getTailwindColors } from "@/features/projected-net-worth/utils/getTailwindColors";


/**
 * Component for displaying a tooltip bar on a graph.
 */
const TooltipBar = ({
  tooltipLeft,
  margin,
  innerHeight,
  tooltipData,
  stockValueScale,
  directions,
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
        const { lineColor } = getTailwindColors(directions[i], linePayload.linePayload);

        return (
          <circle
            key={i}
            cx={tooltipLeft}
            cy={stockValueScale(getStockValue(linePayload.d))}
            r={4.5}
            stroke={lineColor}
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
