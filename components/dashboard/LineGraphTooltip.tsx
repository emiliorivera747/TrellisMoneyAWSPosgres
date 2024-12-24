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
  return (
    <div>
      <Tooltip
        top={margin.top + 110}
        left={tooltipLeft - 10}
        style={{
          ...defaultStyles,
          minWidth: 72,
          textAlign: "center",
          transform: "translateX(-50%)",
          fontSize: "0.6rem",
          background: "none",
          border: "none", // Remove the border
          color: "#495057", // Change the text color to red
          boxShadow: "none", // Ensure no box shadow is applied
        }}
      >
        {formatDate(getDate(tooltipData))}
      </Tooltip>
    </div>
  );
};

export default LineGraphTooltip;
