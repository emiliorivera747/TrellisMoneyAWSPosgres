import React from "react";
import { Tooltip } from "@visx/tooltip";
import { formatDate } from "@/utils/helper-functions/formatDate";
import { getDate } from "@/utils/helper-functions/accessors";

interface LineGraphTooltipProps {
  margin: { top: number };
  tooltipLeft: number;
  defaultStyles: React.CSSProperties;
  tooltipData: any;
}

const LineGraphTooltip = ({
  margin,
  tooltipLeft,
  defaultStyles,
  tooltipData,
}: LineGraphTooltipProps) => {
  if (!tooltipData) return null;
  return (
    <div>
      <Tooltip
        top={margin.top + 95}
        left={tooltipLeft - 10}
        style={{
          ...defaultStyles,
          minWidth: 82,
          textAlign: "center",
          transform: "translateX(-50%)",
          fontSize: "0.68rem",
          background: "none",
          border: "none",
          color: "#868e96", // Change the text color to red
          boxShadow: "none", // Ensure no box shadow is applied
        }}
      >
        {formatDate(getDate(tooltipData[0].d))}
      </Tooltip>
    </div>
  );
};

export default LineGraphTooltip;
