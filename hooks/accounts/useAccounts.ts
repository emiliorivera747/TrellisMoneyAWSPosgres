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
  const [startData, setStartData] = useState<string>("");
  const [endData, setEndData] = useState<string>("");

  const handleFilterChange = (newFilter: string) => setFilter(newFilter);
  const handleStartDataChange = (newStartData: string) => setStartData(newStartData);
  const handleEndDataChange = (newEndData: string) => setEndData(newEndData);

  return {
    filter,
    startData,
    endData,
    handleFilterChange,
    handleStartDataChange,
    handleEndDataChange,
    accountsResponse,
    isLoadingAccounts,
    isErrorAccounts,
  };
};
