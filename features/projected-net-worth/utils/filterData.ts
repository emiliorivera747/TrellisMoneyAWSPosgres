
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";

export function filterProjectionData(
  projectionData: SecurityData[],
  selectedYear: number
): SecurityData[] {

  return projectionData
    .filter((data) => new Date(data.date).getFullYear() <= selectedYear)
    .map((data) => ({
      date: new Date(data.date),
      close: data.close,
    }));
}
