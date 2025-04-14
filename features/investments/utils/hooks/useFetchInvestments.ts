import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/features/investments/services/investmentServices";

/**
 * 
 */
export const useFetchInvestments = () => {
  const {
    data: investmentsResponse,
    isLoading: isLoadingInvestments,
    isError: isErrorInvestments,
  } = useQuery({
    queryKey: ["investments"],
    queryFn: () => investmentService.fetchInvestments(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });

    return { investmentsResponse, isLoadingInvestments, isErrorInvestments };
};
