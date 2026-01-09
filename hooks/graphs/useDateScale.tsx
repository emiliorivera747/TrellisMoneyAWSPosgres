import { useMemo } from "react";
import { scaleTime } from "@visx/scale";
import { extent } from "@visx/vendor/d3-array";
import { TimeSeriesData } from "@/types/components/admin/graphs/graphs";
import { getDate } from "@/utils/helper-functions/accessors/accessors";

const useDateScale = (
  data: TimeSeriesData[],
  margin: { left: number },
  innerWidth: number
) => {
  if (!data || data.length === 0) return null;
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
