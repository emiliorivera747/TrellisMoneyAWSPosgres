import { useQuery } from "@tanstack/react-query";
import itemsService from "@/services/items/itemsServices";
/**
 * Fetches items data using React Query.
 *
 * @returns {object} - Data, loading, and error states.
 */
const useFetchItems = () => {
  const {
    data: itemsResponse,
    isError: itemsHasError,
    error: itemsError,
    isLoading: itemsLoading,
  } = useQuery({
    queryKey: ["items"],
    queryFn: itemsService.getItems,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { itemsResponse, itemsError, itemsLoading, itemsHasError };
};

export default useFetchItems;
