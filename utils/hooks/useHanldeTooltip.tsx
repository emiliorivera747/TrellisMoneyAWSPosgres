import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { bisector } from "@visx/vendor/d3-array";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { getDate } from "@/utils/helper-functions/accessors";

const bisectDate = bisector<SecurityData, Date>((d) => d.date).left;
const getStockValue = (d: SecurityData) => d.close;

const useHandleTooltip = (
    showTooltip: (args: any) => void,
    stockValueScale: any,
    dateScale: any,
    data: SecurityData[]
) => {
    // console.log("Data In Handle Tooltip:", data); 
    // console.log("StockValueScale In Handle Tooltip:", stockValueScale.domain());
    // console.log("DateScale In Handle Tooltip:", dateScale.domain());
    return useCallback(
        (
            event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
        ) => {

            /**
             * Get the x value of the mouse event
             */
            const { x } = localPoint(event) || { x: 0 };
            const x0 = dateScale.invert(x);
            console.log("X0:", x0);
            const index = bisectDate(data, x0, 1);
            console.log("Index:", index); 
            const d0 = data[index - 1];
            const d1 = data[index];
            let d = d0;
            if (d1 && getDate(d1)) {
                d =
                    x0.valueOf() - getDate(d0).valueOf() >
                    getDate(d1).valueOf() - x0.valueOf()
                        ? d1
                        : d0;

                console.log("Inside if statement D:", d);
            }
            showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: stockValueScale(getStockValue(d)),
            });
        },
        [showTooltip, stockValueScale, dateScale, data]
    );
};

export default useHandleTooltip;