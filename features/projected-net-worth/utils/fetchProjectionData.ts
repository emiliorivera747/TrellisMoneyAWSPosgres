import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";
import { InflationFilters } from "@/types/future-projections/futureProjections";

export const fetchProjectionData = async (
  startDate: number,
  endDate: number,
  filter: InflationFilters
) => {
  if (filter === "actual") {
    return financialProjectionService.fetchProjectedNetWorth(startDate, endDate, false);
  }

  if (filter === "inflationAdjusted") {
    return financialProjectionService.fetchProjectedNetWorth(startDate, endDate, true);
  }

  if (filter === "both") {
    const [noInflationData, inflationData] = await Promise.all([
      financialProjectionService.fetchProjectedNetWorth(startDate, endDate, false),
      financialProjectionService.fetchProjectedNetWorth(startDate, endDate, true),
    ]);
    return { noInflationData, inflationData };
  }

  throw new Error("Invalid filter");
};

const fetchAndFormatProjection = async (
  startDate: number,
  endDate: number,
  includeInflation: boolean,
  filterValue: InflationFilters
) => {
  
  const res = await financialProjectionService.fetchProjectedAssetsAndNetworth(
    startDate,
    endDate,
    includeInflation
  );

  const { projectedNetWorth, projectedAssets } = res.data;

  return {
    netWorth: { filterValue, data: projectedNetWorth },
    assets: { filterValue, data: projectedAssets },
  };
};

export const fetchProjections = async (
  startDate: number,
  endDate: number,
  filter: InflationFilters
) => {
  
  if (filter === "actual") {
    const result = await fetchAndFormatProjection(startDate, endDate, false, "actual");
    return {
      projectedNetWorth: [result.netWorth],
      projectedAssets: [result.assets],
    };
  }

  if (filter === "inflationAdjusted") {
    const result = await fetchAndFormatProjection(startDate, endDate, true, "inflationAdjusted");
    return {
      projectedNetWorth: [result.netWorth],
      projectedAssets: [result.assets],
    };
  }

  if (filter === "both") {
    const [inflationResult, actualResult] = await Promise.all([
      fetchAndFormatProjection(startDate, endDate, true, "inflationAdjusted"),
      fetchAndFormatProjection(startDate, endDate, false, "actual"),
    ]);

    return {
      projectedNetWorth: [inflationResult.netWorth, actualResult.netWorth],
      projectedAssets: [inflationResult.assets, actualResult.assets],
    };
  }

  throw new Error("Invalid filter");
};
