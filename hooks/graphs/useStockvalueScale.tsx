import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { TimeSeriesData } from "@/types/components/admin/graphs/graphs";
import { extent } from "@visx/vendor/d3-array";

const getValue = (d: TimeSeriesData) => d?.close;

const useStockValueScale = (
  data: TimeSeriesData[],
  margin: { top: number; right: number; bottom: number; left: number },
  innerHeight: number
) => {
  if (!data || data.length === 0) return null;

  const scale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight - margin.bottom, margin.top + 50],
        domain: extent(data, getValue) as [number, number],
        nice: true,
      }),
    [margin.top, innerHeight, data]
  );
  return scale;
};

export default useStockValueScale;
