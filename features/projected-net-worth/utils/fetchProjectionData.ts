// Services
import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

export const fetchProjectionData = async (
  startDate: number,
  endDate: number,
  filter: string
) => {
  switch (filter) {
    case "withNoInflation":
      return financialProjectionService.generateProjectedNetWorth(
        startDate,
        endDate,
        false
      );
    case "withInflation":
      return financialProjectionService.generateProjectedNetWorth(
        startDate,
        endDate,
        true
      );
    case "isBoth":
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
 *                 - "withNoInflation": Fetch data without considering inflation.
 *                 - "withInflation": Fetch data considering inflation.
 *                 - "isBoth": Fetch both inflation and no-inflation data.
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
  if (filter === "withNoInflation") {
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
          value: "withNoInflation",
          data: projectedNetWorth,
        },
      ],
      projectedAssets: [{ value: "withNoInflation", data: projectedAssets }],
    };
  } else if (filter === "withInflation") {
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
          value: "withInflation",
          data: projectedNetWorth,
        },
      ],
      projectedAssets: [{ value: "withInflation", data: projectedAssets }],
    };
  } else if (filter === "isBoth") {
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
          value: "withInflation",
          data: projectedNetWorth_inflation,
        },
        {
          value: "withNoInflation",
          data: projectedNetWorth_no_inflation,
        },
      ],
      projectedAssets: [
        {
          value: "withInflation",
          data: projectedAssets_inflation as ProjectedAsset[],
        },
        {
          value: "withNoInflation",
          data: projectedAssets_no_inflation as ProjectedAsset[],
        },
      ],
    };
  } else {
    throw new Error("Invalid filter");
  }
};
