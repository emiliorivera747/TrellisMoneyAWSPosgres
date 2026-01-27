import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";
import { InflationFilters } from "@/types/future-projections/futureProjections";
import { GetProjectionsProps } from "@/features/projected-net-worth/types/fetchProjectionsHelper";

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

const getFilters = (
  filter: InflationFilters
): Exclude<InflationFilters, "both">[] => {
  return filter === "both"
    ? (["inflationAdjusted", "actual"] as Exclude<InflationFilters, "both">[])
    : [filter];
};

const getProjections = async ({
  filters,
  startDate,
  endDate,
}: GetProjectionsProps) => {
  const filteredFilters = filters.filter(
    (filter): filter is Exclude<InflationFilters, "both"> => filter !== "both"
  );

  const results = await Promise.all(
    filteredFilters.map((filter) =>
      fetchAndFormatProjection(startDate, endDate, filter)
    )
  );
  return {
    projectedNetWorth: results.map((result) => result.netWorth),
    projectedAssets: results.map((result) => result.assets),
  };
};

export const fetchProjections = async (
  startDate: number,
  endDate: number,
  filter: InflationFilters
) => {
  
  const filters = getFilters(filter);

  const { projectedNetWorth, projectedAssets } = await getProjections({
    filters,
    startDate,
    endDate,
  });

  return { projectedNetWorth, projectedAssets };
};



