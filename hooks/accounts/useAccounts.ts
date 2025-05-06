"use client";
import { useState } from "react";
import { useFetchAccounts } from "@/features/accounts/hooks/useFetchAccounts";

// Hooks
import useGroupAccounts from "@/features/accounts/hooks/useGroupAccounts";

// Types
import { UseAccountsResponse } from "@/types/hooks";

/**
 * Custom hook to handle the accounts page state
 */
export const useAccounts = (): UseAccountsResponse => {
  const { accountsResponse, isLoadingAccounts, isErrorAccounts } =
    useFetchAccounts();

  const accounts = accountsResponse?.data || null;

  const { groups } = useGroupAccounts({ accounts });
  const [filter, setFilter] = useState<string>("net-worth");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  );

  const handleFilterChange = (newFilter: string) => setFilter(newFilter);

  const handleStartDateChange = (newStartData: Date) =>
    setStartDate(newStartData);

  const handleEndDateChange = (newEndData: Date) => setEndDate(newEndData);

  const handleDateFilterChange = (newStartData: Date, newEndData: Date) => {
    setStartDate(newStartData);
    setEndDate(newEndData);
  };

  return {
    filter,
    startDate,
    endDate,
    groups,
    handleFilterChange,
    handleStartDateChange,
    handleEndDateChange,
    handleDateFilterChange,
    accountsResponse,
    isLoadingAccounts,
    isErrorAccounts,
  };
};
