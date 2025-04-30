"use client";
import { useState } from "react";
import { useFetchAccounts } from "@/features/accounts/utils/hooks/useFetchAccounts";

/**
 * Custom hook to handle the accounts page state
 */
export const useAccounts = () => {
  const { accountsResponse, isLoadingAccounts, isErrorAccounts } =
    useFetchAccounts();

  const [filter, setFilter] = useState<string>("net-worth");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleFilterChange = (newFilter: string) => setFilter(newFilter);
  const handleStartDataChange = (newStartData: string) =>
    setStartDate(newStartData);
  const handleEndDataChange = (newEndData: string) => setEndDate(newEndData);

  return {
    filter,
    startDate,
    endDate,
    handleFilterChange,
    handleStartDataChange,
    handleEndDataChange,
    accountsResponse,
    isLoadingAccounts,
    isErrorAccounts,
  };
};
