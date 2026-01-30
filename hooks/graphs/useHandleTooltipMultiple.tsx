import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { bisector } from "@visx/vendor/d3-array";
import { TimeSeriesData, LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { getDate } from "@/utils/helper-functions/accessors/accessors";

const bisectDate = bisector<TimeSeriesData, Date>((d) => d.date).left;
const getStockValue = (d: TimeSeriesData) => d?.value;

const handleMultipleDataPoints = (
  showTooltip: (args: any) => void,
  stockValueScale: any,
  dateScale: any,
  ...lineConfigs: LineSeriesConfig[]
) => {
  return useCallback(
    (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = dateScale.invert(x);

      const tooltipData = lineConfigs.map((payload) => {
        const index = bisectDate(payload.data, x0, 1);
        const d0 = payload.data[index - 1];
        const d1 = payload.data[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        return {
          lineDataPoint: d,
          strokeWidth: payload.strokeWidth,
          lineData: payload.data,
          lineConfig: payload,
        };
      });

      // Snap tooltipLeft to the data point's X position so the circle stays on the line
      const snappedX = dateScale(getDate(tooltipData[0].lineDataPoint));

      showTooltip({
        tooltipData,
        tooltipLeft: snappedX,
        tooltipTop: stockValueScale(getStockValue(tooltipData[0].lineDataPoint)),
      });
    },
    [showTooltip, stockValueScale, dateScale, JSON.stringify(lineConfigs)]
  );
};

export default handleMultipleDataPoints;
