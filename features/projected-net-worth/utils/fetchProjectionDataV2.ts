// Services
import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";

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
 *            projected_net_worth: Array<{ value: string, data: any }>,
 *            projected_assets: Array<{ value: string, data: any }>
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
    const { projected_net_worth, projected_assets } = res.data;

    return {
      projected_net_worth: [
        {
          value: "withNoInflation",
          data: projected_net_worth,
        },
      ],
      projected_assets: [{ value: "withNoInflation", data: projected_assets }],
    };
  } else if (filter === "withInflation") {
    const res =
      await financialProjectionService.generateProjectedAssetsAndNetworth(
        startDate,
        endDate,
        true
      );

    const { projected_net_worth, projected_assets } = res.data;
    return {
      projected_net_worth: [
        {
          value: "withInflation",
          data: projected_net_worth,
        },
      ],
      projected_assets: [{ value: "withInflation", data: projected_assets }],
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
      projected_net_worth: projected_net_worth_inflation,
      projected_assets: projected_assets_inflation,
    } = inflationData.data;

    const {
      projected_net_worth: projected_net_worth_no_inflation,
      projected_assets: projected_assets_no_inflation,
    } = noInflationData.data;

    return {
      projected_net_worth: [
        {
          value: "withInflation",
          data: projected_net_worth_inflation,
        },
        {
          value: "withNoInflation",
          data: projected_net_worth_no_inflation,
        },
      ],
      projected_assets: [
        {
          value: "withInflation",
          data: projected_assets_inflation,
        },
        {
          value: "withNoInflation",
          data: projected_assets_no_inflation,
        },
      ],
    };
  } else {
    throw new Error("Invalid filter");
  }
};
