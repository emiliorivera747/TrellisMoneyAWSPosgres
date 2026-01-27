import { InflationFilters } from "@/types/future-projections/futureProjections";

export interface GetProjectionsProps {
  filters: Exclude<InflationFilters, "both">[];
  startDate: number;
  endDate: number;
}
