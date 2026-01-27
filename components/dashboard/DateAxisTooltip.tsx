import React from "react";
import { Tooltip } from "@visx/tooltip";
import { formatDate } from "@/utils/helper-functions/formatting/formatDate";
import { getDate } from "@/utils/helper-functions/accessors/accessors";
import { LineGraphTooltipProps } from "@/types/components/admin/graphs/tooltips";
const defaultMargin = { top: 0};

/**
 *
 *
 * @param param0
 * @returns
 */
const LineGraphTooltip = ({
  margin = defaultMargin,
  tooltipLeft,
  defaultStyles,
  tooltipData,
}: LineGraphTooltipProps) => {
  if (!tooltipData) return null;
  return (
    <div className="">
      <Tooltip
        top={margin.top + 140}
        left={tooltipLeft - 10}
        style={{
          ...defaultStyles,
          minWidth: 82,
          textAlign: "center",
          transform: "translateX(-50%)",
          fontSize: "0.68rem",
          background: "none",
          border: "none",
          color: "var(--tertiary-700)",
          boxShadow: "none", // Ensure no box shadow is applied
        }}
      >
        {formatDate(getDate(tooltipData[0].lineDataPoint))}
      </Tooltip>
    </div>
  );
};

export default LineGraphTooltip;
