
import { TimeSeriesData } from "@/types/components/admin/graphs/data";

export function filterProjectionData(
  projectionData: TimeSeriesData[],
  selectedYear: number
): TimeSeriesData[] {

  return projectionData
    .filter((data) => new Date(data.date).getFullYear() <= selectedYear)
    .map((data) => ({
      date: new Date(data.date),
      value: data.value,
    }));
}
