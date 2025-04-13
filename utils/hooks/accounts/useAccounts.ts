import { useFetchAccounts } from "@/features/accounts/utils/hooks/useFetchAccounts";

/**
 * Custom hook to handle the accounts page state
 */
export const useAccounts = () => {
  const { accounts, isLoadingAccounts, isErrorAccounts } = useFetchAccounts();

  return {
    accounts,
    isLoadingAccounts,
    isErrorAccounts,
  };
};
