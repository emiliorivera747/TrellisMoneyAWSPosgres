import { useQuery } from "@tanstack/react-query";
import { householdService } from "@/features/accounts/services/householdServices";

/**
 *
 * Custom hook to fetch the household members
 *
 * @returns {Object} - An object containing accounts data, loading state, and error state.
 */
export const useFetchHouseholdMembers = () => {
  const {
    data: householdResponse,
    isLoading: isLoadingHousehold,
    isError: isErrorHousehold,
  } = useQuery({
    queryKey: ["household"],
    queryFn: () => householdService.fetchHousehold(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { householdResponse, isLoadingHousehold, isErrorHousehold };
};
