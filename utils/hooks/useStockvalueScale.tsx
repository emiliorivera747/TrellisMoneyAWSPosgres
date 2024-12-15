import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { max } from "@visx/vendor/d3-array";

interface SecurityData {
    date: string;
    close: number;
}

const getStockValue = (d: SecurityData) => d.close;

const useStockValueScale = (
    data: SecurityData[],
    margin: { top: number; right: number; bottom: number; left: number },
    innerHeight: number
) => {
    return useMemo(
        () =>
            scaleLinear({
                range: [innerHeight + margin.top, margin.top],
                domain: [0, (max(data, getStockValue) || 0) + innerHeight / 3],
                nice: true,
            }),
        [margin.top, innerHeight, data]
    );
};

export default useStockValueScale;