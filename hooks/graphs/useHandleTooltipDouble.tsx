import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { bisector } from "@visx/vendor/d3-array";
import { TimeSeriesData } from "@/types/components/admin/graphs/data";
import { getDate } from "@/utils/helper-functions/accessors/accessors";

const bisectDate = bisector<TimeSeriesData, Date>((d) => d.date).left;
const getStockValue = (d: TimeSeriesData) => d.value;

const useHandleTooltipDouble = (
    showTooltip: (args: any) => void,
    stockValueScale: any,
    dateScale: any,
    data1: TimeSeriesData[],
    data2: TimeSeriesData[]
) => {
    return useCallback(
        (
            event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
        ) => {
            /**
             * Get the x value of the mouse event
             */
            const { x } = localPoint(event) || { x: 0 };
            const x0 = dateScale.invert(x);

            // Calculate d for data1
            const index1 = bisectDate(data1, x0, 1);
            const d01 = data1[index1 - 1];
            const d11 = data1[index1];
            let d1 = d01;
            if (d11 && getDate(d11)) {
                d1 =
                    x0.valueOf() - getDate(d01).valueOf() >
                    getDate(d11).valueOf() - x0.valueOf()
                        ? d11
                        : d01;
            }

            // Calculate d for data2
            const index2 = bisectDate(data2, x0, 1);
            const d02 = data2[index2 - 1];
            const d12 = data2[index2];
            let d2 = d02;
            if (d12 && getDate(d12)) {
                d2 =
                    x0.valueOf() - getDate(d02).valueOf() >
                    getDate(d12).valueOf() - x0.valueOf()
                        ? d12
                        : d02;
            }


            showTooltip({
                tooltipData: {data1: d1, data2: d2},
                tooltipLeft: x,
                tooltipTop: stockValueScale(getStockValue(d1)),
            });
        },
        [showTooltip, stockValueScale, dateScale, data1, data2]
    );
};

export default useHandleTooltipDouble;
