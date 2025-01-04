import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { max } from "@visx/vendor/d3-array";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { extent } from "@visx/vendor/d3-array";


const getStockValue = (d: SecurityData) => d.close;

const useStockValueScale = (
    data: SecurityData[],
    margin: { top: number; right: number; bottom: number; left: number },
    innerHeight: number
) => {
    const scale = useMemo(
        () =>
            scaleLinear({
                range: [innerHeight - margin.bottom, margin.top + 50],
                domain: extent(data, getStockValue) as [number, number],
                nice: true,
            }),
        [margin.top, innerHeight, data]
    );
    // console.log("Scale:", scale.domain());
    return scale;
};

export default useStockValueScale;