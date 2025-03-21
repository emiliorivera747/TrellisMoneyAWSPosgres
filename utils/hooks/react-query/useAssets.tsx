import { useQuery } from "@tanstack/react-query";
import { fetchFinancialAssets } from "@/features/projected-financial-assets/utils/fetchFinancialAssets";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

const useAssets  = (
  currentYear: number,
  selectedYear: number,
  filter: InflationFilters
) => {
  const { data: financialAssetsData, error: financialAssetsError, isPending: isPendingAssets } = useQuery({
    queryKey: ["financialAssets", currentYear, selectedYear, filter],
    queryFn: () => fetchFinancialAssets(currentYear, selectedYear, filter),
  });
  return { financialAssetsData, financialAssetsError, isPendingAssets};
};

export default useAssets;
