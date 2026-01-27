// Services
import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

export const fetchProjectionData = async (
  startDate: number,
  endDate: number,
  filter: string
) => {
  switch (filter) {
    case "actual":
      return financialProjectionService.fetchProjectedNetWorth(
        startDate,
        endDate,
        false
      );
    case "inflationAdjusted":
      return financialProjectionService.fetchProjectedNetWorth(
        startDate,
        endDate,
        true
      );
    case "both":
      const noInflationData =
        await financialProjectionService.fetchProjectedNetWorth(
          startDate,
          endDate,
          false
        );
      const inflationData =
        await financialProjectionService.fetchProjectedNetWorth(
          startDate,
          endDate,
          true
        );
      return { noInflationData, inflationData };
    default:
      throw new Error("Invalid filter");
  }
};

/**
 * Fetches projection data for projected net worth and assets based on the specified filter.
 *
 * @param startDate - The start date for the projection data (as a timestamp).
 * @param endDate - The end date for the projection data (as a timestamp).
 * @param filter - The filter to determine the type of projection data to fetch.
 *                 Possible values:
 *                 - "actual": Fetch data without considering inflation.
 *                 - "inflationAdjusted": Fetch data considering inflation.
 *                 - "both": Fetch both inflation and no-inflation data.
 *
 * @returns A promise that resolves to an object containing the projected net worth and assets.
 *          The structure of the returned object is:
 *          {
 *            projectedNetWorth: Array<{ filterValue: string, data: any }>,
 *            projectedAssets: Array<{ filterValue: string, data: any }>
 *          }
 *
 * @throws Will throw an error if the filter value is invalid.
 */
export const fetchProjections = async (
  startDate: number,
  endDate: number,
  filter: string
) => {
  if (filter === "actual") {
    const res =
      await financialProjectionService.fetchProjectedAssetsAndNetworth(
        startDate,
        endDate,
        false
      );
    const { projectedNetWorth, projectedAssets } = res.data;

    return {
      projectedNetWorth: [
        {
          filterValue: "actual",
          data: projectedNetWorth,
        },
      ],
      projectedAssets: [{ filterValue: "actual", data: projectedAssets }],
    };
  } else if (filter === "inflationAdjusted") {
    const res =
      await financialProjectionService.fetchProjectedAssetsAndNetworth(
        startDate,
        endDate,
        true
      );

    const { projectedNetWorth, projectedAssets } = res.data;

    return {
      projectedNetWorth: [
        {
          filterValue: "inflationAdjusted",
          data: projectedNetWorth,
        },
      ],
      projectedAssets: [
        { filterValue: "inflationAdjusted", data: projectedAssets },
      ],
    };
  } else if (filter === "both") {
    const noInflationData =
      await financialProjectionService.fetchProjectedAssetsAndNetworth(
        startDate,
        endDate,
        false
      );

    const inflationData =
      await financialProjectionService.fetchProjectedAssetsAndNetworth(
        startDate,
        endDate,
        true
      );

    const {
      projectedNetWorth: projectedNetWorth_inflation,
      projectedAssets: projectedAssets_inflation,
    } = inflationData.data;

    const {
      projectedNetWorth: projectedNetWorth_no_inflation,
      projectedAssets: projectedAssets_no_inflation,
    } = noInflationData.data;

    return {
      projectedNetWorth: [
        {
          filterValue: "inflationAdjusted",
          data: projectedNetWorth_inflation,
        },
        {
          filterValue: "actual",
          data: projectedNetWorth_no_inflation,
        },
      ],
      projectedAssets: [
        {
          filterValue: "inflationAdjusted",
          data: projectedAssets_inflation as ProjectedAsset[],
        },
        {
          filterValue: "actual",
          data: projectedAssets_no_inflation as ProjectedAsset[],
        },
      ],
    };
  } else {
    throw new Error("Invalid filter");
  }
};
