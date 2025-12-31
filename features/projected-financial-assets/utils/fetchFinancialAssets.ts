import financialAssetsService from "@/features/projected-financial-assets/services/financialAssetsServices";

export const fetchFinancialAssets = async (startDate: number, endDate: number, filter: string) => {
    switch (filter) {
      case "withNoInflation":
        return financialAssetsService.getFinancialAssets(startDate, endDate, false);
      case "withInflation":
        return financialAssetsService.getFinancialAssets(startDate, endDate, true);
      case "isBoth":
        const noInflationData = await financialAssetsService.getFinancialAssets(startDate, endDate, false);
        const inflationData = await financialAssetsService.getFinancialAssets(startDate, endDate, true);
        return { noInflationData, inflationData };
      default:
        throw new Error("Invalid filter");
    }
  };
  