import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { bisector } from "@visx/vendor/d3-array";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { getDate } from "@/utils/helper-functions/accessors/accessors";

const bisectDate = bisector<SecurityData, Date>((d) => d.date).left;
const getStockValue = (d: SecurityData) => d.close;

const useHandleTooltip = (
    showTooltip: (args: any) => void,
    stockValueScale: any,
    dateScale: any,
    data1: SecurityData[],
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
            const index = bisectDate(data1, x0, 1);
            const d0 = data1[index - 1];
            const d1 = data1[index];
            let d = d0;
            if (d1 && getDate(d1)) {
                d =
                    x0.valueOf() - getDate(d0).valueOf() >
                    getDate(d1).valueOf() - x0.valueOf()
                        ? d1
                        : d0;
            }
    
            showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: stockValueScale(getStockValue(d)),
            });
        },
        [showTooltip, stockValueScale, dateScale, data1]
    );
};

export default useHandleTooltip;