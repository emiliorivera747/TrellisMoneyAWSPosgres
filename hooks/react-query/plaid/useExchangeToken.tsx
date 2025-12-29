import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/toast/use-toast";
import plaidService from "@/features/plaid-link/services/plaidServices";

/**
 * Custom hook for exchanging a token using the Plaid service.
 *
 * This hook provides a mutation function to exchange a token and handles
 * success and error states with appropriate toast notifications.
 *
 * @returns {Object} An object containing:
 * - `exchangeTokenMutate` (function): The mutation function to trigger the token exchange.
 * - `isExchanging` (boolean): Indicates whether the token exchange is in progress.
 * - `hasExchangeError` (boolean): Indicates whether there was an error during the token exchange.
 *
 * @example
 * const { exchangeTokenMutate, isExchanging, hasExchangeError } = useExchangeToken();
 *
 * exchangeTokenMutate(token);
 */
const useExchangeToken = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: exchangeTokenMutate,
    isPending: isExchanging,
    isError: hasExchangeError,
  } = useMutation({
    mutationFn: plaidService.exchangeToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast({
        title: "Token Exchange",
        description: "Successfully exchanged token",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to exchange token",
      });
    },
  });

  return { exchangeTokenMutate, isExchanging, hasExchangeError };
};

export default useExchangeToken;
