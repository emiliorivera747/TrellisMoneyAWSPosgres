import { useCallback } from "react";
import { localPoint } from "@visx/event";
import { bisector } from "@visx/vendor/d3-array";
import { SecurityData } from "@/types/dashboardComponents";

const bisectDate = bisector<SecurityData, Date>((d) => new Date(d.date)).left;
const getDate = (d: SecurityData) => new Date(d.date);
const getStockValue = (d: SecurityData) => d.close;

const useHandleTooltip = (
    showTooltip: (args: any) => void,
    stockValueScale: any,
    dateScale: any,
    data: SecurityData[]
) => {
    return useCallback(
        (
            event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
        ) => {
            const { x } = localPoint(event) || { x: 0 };
            const x0 = dateScale.invert(x);
            const index = bisectDate(data, x0, 1);
            const d0 = data[index - 1];
            const d1 = data[index];
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
        [showTooltip, stockValueScale, dateScale, data]
    );
};

export default useHandleTooltip;