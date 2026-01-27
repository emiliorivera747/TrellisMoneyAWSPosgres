import { InflationFilters } from "@/types/future-projections/futureProjections";

export interface GetProjectionsProps {
  filters: InflationFilters[];
  startDate: number;
  endDate: number;
}
