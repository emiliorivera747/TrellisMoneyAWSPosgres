import { useFetchInvestments } from "@/features/investments/utils/hooks/useFetchInvestments";

/**
 * @description Custom hook handles the state of the whole investment page
 * @returns {Object} - An object containing investments data, loading state, and error state.
 */
export const useInvestments = () => {
  const { investmentsResponse, isLoadingInvestments, isErrorInvestments } =
    useFetchInvestments();

  return {
    investmentsResponse,
    isLoadingInvestments,
    isErrorInvestments,
  };
};
