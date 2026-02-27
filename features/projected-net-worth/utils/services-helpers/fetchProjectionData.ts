/**
 * Helpers for fetching financial projection data with inflation adjustment support.
 */
import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";
import { InflationFilters } from "@/types/future-projections/futureProjections";
import { GetProjectionsProps } from "@/features/projected-net-worth/types/fetchProjectionsHelper";

/** Maps inflation filter values to their corresponding API parameter. */
const FILTER_CONFIG: Record<
  Exclude<InflationFilters, "both">,
  { isInflationAdjusted: boolean }
> = {
  actual: { isInflationAdjusted: false },
  inflationAdjusted: { isInflationAdjusted: true },
};

/** Fetches projected net worth data. Returns both datasets when filter is "both". */
export const fetchNetWorthProjection = async (
  startDate: number,
  endDate: number,
  filter: InflationFilters
) => {
  if (filter !== "both") {
    const { isInflationAdjusted } = FILTER_CONFIG[filter];
    return financialProjectionService.fetchProjectedNetWorth(
      startDate,
      endDate,
      isInflationAdjusted
    );
  }
  const [noInflationData, inflationData] = await Promise.all([
    financialProjectionService.fetchProjectedNetWorth(
      startDate,
      endDate,
      false
    ),
    financialProjectionService.fetchProjectedNetWorth(startDate, endDate, true),
  ]);
  return { noInflationData, inflationData };
};

/** Fetches and formats net worth and assets projection for a single filter. */
const fetchAndFormatProjection = async (
  startDate: number,
  endDate: number,
  filter: Exclude<InflationFilters, "both">
) => {
  const { isInflationAdjusted } = FILTER_CONFIG[filter];
  const res = await financialProjectionService.fetchProjectedAssetsAndNetworth(
    startDate,
    endDate,
    isInflationAdjusted
  );
  if (!res.data) throw new Error(res.message ?? "Failed to fetch projection data");
  const { projectedNetWorth, projectedAssets } = res.data;
  return {
    netWorth: { filterValue: filter, data: projectedNetWorth },
    assets: { filterValue: filter, data: projectedAssets },
  };
};

/** Expands "both" filter into individual filter values, or returns single filter as array. */
const expandInflationFilter = (
  filter: InflationFilters
): Exclude<InflationFilters, "both">[] => {
  return filter === "both"
    ? (["inflationAdjusted", "actual"] as Exclude<InflationFilters, "both">[])
    : [filter];
};

/** Fetches projections for multiple filters in parallel and aggregates results. */
const fetchFormattedProjections = async ({
  filters,
  startDate,
  endDate,
}: GetProjectionsProps) => {
  /**
   * Goes through the filter array which can only consist of
   * inflationAdjusted and actual filters
   */
  const results = await Promise.all(
    filters.map((filter) =>
      fetchAndFormatProjection(startDate, endDate, filter)
    )
  );
  return {
    projectedNetWorth: results.map((result) => result.netWorth),
    projectedAssets: results.map((result) => result.assets),
  };
};

/** Main entry point for fetching projected net worth and assets data. */
export const fetchProjections = async (
  startDate: number,
  endDate: number,
  filter: InflationFilters
) => {
  const filters = expandInflationFilter(filter);

  const { projectedNetWorth, projectedAssets } =
    await fetchFormattedProjections({
      filters,
      startDate,
      endDate,
    });

  return { projectedNetWorth, projectedAssets };
};
