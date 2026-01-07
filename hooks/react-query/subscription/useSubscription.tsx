import { useQuery } from "@tanstack/react-query";
import subscriptionService from "@/services/subscription/subscriptions";
/**
 * Fetches items data using React Query.
 *
 * @returns {object} - Data, loading, and error states.
 */
const useSubscription = () => {
  const {
    data: subscriptionResponse,
    isError: subscriptionHasError,
    error: subscriptionError,
    isLoading: isLoadingSubscription,
  } = useQuery({
    queryKey: ["subscribed"],
    queryFn: subscriptionService.isUserSubscribed,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return {
    subscriptionResponse,
    subscriptionError,
    isLoadingSubscription,
    subscriptionHasError,
  };
};

export default useSubscription;
