import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { bisector } from "@visx/vendor/d3-array";
import { TimeSeriesData } from "@/types/graphs";
import { LinePayload } from "@/types/graphs";
import { getDate } from "@/utils/helper-functions/accessors";

const bisectDate = bisector<TimeSeriesData, Date>((d) => d.date).left;
const getStockValue = (d: TimeSeriesData) => d?.close;

const handleMultipleDataPoints = (
  showTooltip: (args: any) => void,
  stockValueScale: any,
  dateScale: any,
  ...linePayloads: LinePayload[]
) => {
  return useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = dateScale.invert(x);

      const tooltipData = linePayloads.map((payload) => {
        const index = bisectDate(payload.lineData, x0, 1);
        const d0 = payload.lineData[index - 1];
        const d1 = payload.lineData[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        return {
          d: d,
          strokeWidth: payload.strokeWidth,
          data: payload.lineData,
          linePayload: payload,
        };
      });

      showTooltip({
        tooltipData,
        tooltipLeft: x,
        tooltipTop: stockValueScale(getStockValue(tooltipData[0].d)),
      });
    },
    [showTooltip, stockValueScale, dateScale, JSON.stringify(linePayloads)]
  );
};

export default handleMultipleDataPoints;
