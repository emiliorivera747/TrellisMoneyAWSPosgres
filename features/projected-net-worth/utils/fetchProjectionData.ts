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
      return financialProjectionService.generateProjectedNetWorth(
        startDate,
        endDate,
        false
      );
    case "inflationAdjusted":
      return financialProjectionService.generateProjectedNetWorth(
        startDate,
        endDate,
        true
      );
    case "both":
      const noInflationData =
        await financialProjectionService.generateProjectedNetWorth(
          startDate,
          endDate,
          false
        );
      const inflationData =
        await financialProjectionService.generateProjectedNetWorth(
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
 *            projectedNetWorth: Array<{ value: string, data: any }>,
 *            projectedAssets: Array<{ value: string, data: any }>
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
      await financialProjectionService.generateProjectedAssetsAndNetworth(
        startDate,
        endDate,
        false
      );
    const { projectedNetWorth, projectedAssets } = res.data;

    return {
      projectedNetWorth: [
        {
          value: "actual",
          data: projectedNetWorth,
        },
      ],
      projectedAssets: [{ value: "actual", data: projectedAssets }],
    };
  } else if (filter === "inflationAdjusted") {
    const res =
      await financialProjectionService.generateProjectedAssetsAndNetworth(
        startDate,
        endDate,
        true
      );

    const { projectedNetWorth, projectedAssets } = res.data;

    return {
      projectedNetWorth: [
        {
          value: "inflationAdjusted",
          data: projectedNetWorth,
        },
      ],
      projectedAssets: [{ value: "inflationAdjusted", data: projectedAssets }],
    };
  } else if (filter === "both") {
    const noInflationData =
      await financialProjectionService.generateProjectedAssetsAndNetworth(
        startDate,
        endDate,
        false
      );

    const inflationData =
      await financialProjectionService.generateProjectedAssetsAndNetworth(
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
          value: "inflationAdjusted",
          data: projectedNetWorth_inflation,
        },
        {
          value: "actual",
          data: projectedNetWorth_no_inflation,
        },
      ],
      projectedAssets: [
        {
          value: "inflationAdjusted",
          data: projectedAssets_inflation as ProjectedAsset[],
        },
        {
          value: "actual",
          data: projectedAssets_no_inflation as ProjectedAsset[],
        },
      ],
    };
  } else {
    throw new Error("Invalid filter");
  }
};
