
// Services
import financialProjectionService from "@/features/projected-net-worth/services/financialProjectionsService";

export const fetchProjectionData = async (startDate: number, endDate: number, filter: string) => {
    switch (filter) {
      case "isNoInflation":
        return financialProjectionService.generateProjectedNetWorth(startDate, endDate, false);
      case "isInflation":
        return financialProjectionService.generateProjectedNetWorth(startDate, endDate, true);
      case "isBoth":
        const noInflationData = await financialProjectionService.generateProjectedNetWorth(startDate, endDate, false);
        const inflationData = await financialProjectionService.generateProjectedNetWorth(startDate, endDate, true);
        return { noInflationData, inflationData };
      default:
        throw new Error("Invalid filter");
    }
  };
  