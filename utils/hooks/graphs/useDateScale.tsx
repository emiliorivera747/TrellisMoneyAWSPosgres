import { useMemo } from "react";
import { scaleTime } from "@visx/scale";
import { extent } from "@visx/vendor/d3-array";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { getDate } from "@/utils/helper-functions/accessors";

const useDateScale = (data: SecurityData[], margin: { left: number }, innerWidth: number) => {

    const scale = useMemo(
        () =>
           scaleTime({
                range: [margin.left, innerWidth],
                domain: extent(data, getDate) as [Date, Date],
            }),
        [innerWidth, margin.left, data]
    );
    return scale;
};

export default useDateScale;