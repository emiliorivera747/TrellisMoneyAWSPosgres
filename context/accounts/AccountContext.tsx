"use client";
import { createContext, useContext } from "react";

// Hooks
import { useAccounts } from "@/hooks/accounts/useAccounts";

const AccountsContext = createContext<any>(null);

/**
 * Custom hook to use the AccountsContext
 *
 */
export const AccountsProvider = ({ children }: any) => {
  const accountState = useAccounts();
  return (
    <AccountsContext.Provider value={accountState}>
      {children}
    </AccountsContext.Provider>
  );
};

/**
 * Custom hook to use the AccountsContext
 *
 */
export const useAccountsContext = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error(
      "useAccountsContext must be used within an AccountsProvider"
    );
  }
  return context;
};
