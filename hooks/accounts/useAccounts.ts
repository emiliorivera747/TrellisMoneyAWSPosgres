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

  return {
    filter,
    startData,
    endData,
    setFilter,
    setStartData,
    setEndData,
    accountsResponse,
    isLoadingAccounts,
    isErrorAccounts,
  };
};
