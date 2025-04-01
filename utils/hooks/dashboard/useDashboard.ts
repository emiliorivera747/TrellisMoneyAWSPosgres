"use client";

import { useState } from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import useFetchProjections from "@/utils/hooks/financial-projections/useFetchProjections";
import useUpdateAssets from "@/utils/hooks/financial-assets/useUpdateAssets";
import useUpdateAccount from "@/utils/hooks/financial-assets/useUpdateAccount";
import useFetchUser from "@/utils/hooks/user/useFetchUser";
import useGenerateToken from "@/utils/hooks/plaid/useGenerateToken";
import { handleFormSubmission } from "@/features/projected-financial-assets/utils/handleAssetFormSubmission";
import { DashboardState } from "@/types/dashboard";

const currentYear = Number(new Date().getFullYear().toString());

// Define form data type (customize as needed)
interface FormData {
  [key: string]: number; // Example: adjust based on your actual form fields
}

/**
 * Handles all of the state for the dashboard page.
 * @returns Dashboard state and functions to handle the dashboard
 */
export const useDashboard = (): DashboardState & {
  handleYearSelection: (year: number) => void;
  handleFilterChange: (filter: InflationFilters) => void;
  onSubmit: SubmitHandler<FormData>;
} => {
  const [selectedYear, setSelectedYear] = useState<number>(currentYear + 40);
  const [selectedFilter, setSelectedFilter] = useState<InflationFilters>("isNoInflation");

  const { projectionData, projectionError, projectionLoading } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });

  const { mutate: mutateAsset, isPending } = useUpdateAssets();
  const { user, error: userError } = useFetchUser();
  const linkToken = useGenerateToken();

  const form = useForm<FormData, any, undefined>({
    defaultValues: {}, 
  }) as UseFormReturn<FormData, any, undefined>;

  const [mode, setMode] = useState<"edit" | "view">("view");
  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === "edit" ? "view" : "edit"));
  };

  const handleYearSelection = (year: number) => setSelectedYear(year);
  const handleFilterChange = (filter: InflationFilters) => setSelectedFilter(filter);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleFormSubmission(data, projectionData, selectedFilter, user, mutateAsset);
    setMode("view");
  };

  return {
    selectedYear,
    selectedFilter,
    projectionData,
    projectionError,
    projectionLoading,
    user,
    userError,
    linkToken,
    isPending,
    form,
    mode,
    handleModeChange,
    mutateAsset,
    handleYearSelection,
    handleFilterChange,
    onSubmit,
  };
};