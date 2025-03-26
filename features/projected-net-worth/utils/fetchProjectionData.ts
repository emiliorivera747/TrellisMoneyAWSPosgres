// Services
import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";

export const fetchProjectionData = async (
  startDate: number,
  endDate: number,
  filter: string
) => {
  switch (filter) {
    case "isNoInflation":
      return financialProjectionService.generateProjectedNetWorth(
        startDate,
        endDate,
        false
      );
    case "isInflation":
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

export const fetchProjections = async (
  startDate: number,
  endDate: number,
  filter: string
) => {
  if (filter === "isNoInflation") {
    const res =
      await financialProjectionService.generateProjectedAssetsAndNetworth(
        startDate,
        endDate,
        false
      );
    const { projected_net_worth, projected_assets } = res.data;

    return {
      projected_net_worth: [
        { value: "inNoInflation", data: projected_net_worth },
      ],
      projected_assets: [{ value: "inNoInflation", data: projected_assets }],
    };
  } else if (filter === "isInflation") {

    const res =
      await financialProjectionService.generateProjectedAssetsAndNetworth(
        startDate,
        endDate,
        true
      );

    const { projected_net_worth, projected_assets } = res.data;

    return {
      projected_net_worth: [
        { value: "inInflation", data: projected_net_worth },
      ],
      projected_assets: [{ value: "inInflation", data: projected_assets }],
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
        { value: "isInflation", data: projected_net_worth_inflation },
        { value: "isNoInflation", data: projected_net_worth_no_inflation },
      ],
      projected_assets: [
        { value: "isInflation", data: projected_assets_inflation },
        { value: "isNoInflation", data: projected_assets_no_inflation },
      ],
    };
  } else {
    throw new Error("Invalid filter");
  }
};
