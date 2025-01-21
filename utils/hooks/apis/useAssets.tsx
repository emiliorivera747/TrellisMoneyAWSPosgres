import { useQuery } from "@tanstack/react-query";
import { fetchFinancialAssets } from "@/features/projected-financial-assets/utils/fetchFinancialAssets";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

const useAssets  = (
  currentYear: number,
  selectedYear: number,
  filter: InflationFilters
) => {
  const { data: financialAssetsData, error: financialAssetsError } = useQuery({
    queryKey: ["financialAssets", currentYear, selectedYear],
    queryFn: () => fetchFinancialAssets(currentYear, selectedYear, filter),
  });
  return { financialAssetsData, financialAssetsError };
};

export default useAssets;
