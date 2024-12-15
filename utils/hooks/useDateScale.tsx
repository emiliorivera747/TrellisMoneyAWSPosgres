import { useMemo } from "react";
import { scaleTime } from "@visx/scale";
import { extent } from "@visx/vendor/d3-array";
import { SecurityData } from "@/types/dashboardComponents";

const getDate = (d: SecurityData) => new Date(d.date);

const useDateScale = (data: SecurityData[], margin: { left: number }, innerWidth: number) => {
    return useMemo(
        () =>
            scaleTime({
                range: [margin.left, innerWidth + margin.left],
                domain: extent(data, getDate) as [Date, Date],
            }),
        [innerWidth, margin.left, data]
    );
};

export default useDateScale;