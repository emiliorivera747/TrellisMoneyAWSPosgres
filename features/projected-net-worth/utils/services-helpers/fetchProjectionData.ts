import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";
import { InflationFilters } from "@/types/future-projections/futureProjections";

const FILTER_CONFIG: Record<
  Exclude<InflationFilters, "both">,
  { isInflationAdjusted: boolean }
> = {
  actual: { isInflationAdjusted: false },
  inflationAdjusted: { isInflationAdjusted: true },
};

export const fetchProjectionData = async (
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
  const { projectedNetWorth, projectedAssets } = res.data;

  return {
    netWorth: { filterValue: filter, data: projectedNetWorth },
    assets: { filterValue: filter, data: projectedAssets },
  };
};

export const fetchProjections = async (
  startDate: number,
  endDate: number,
  filter: InflationFilters
) => {
  const filters: Exclude<InflationFilters, "both">[] =
    filter === "both" ? ["inflationAdjusted", "actual"] : [filter];

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
