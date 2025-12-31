"use client";
import { useState, useCallback, useMemo } from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/hooks/user/useFetchUser";
import { handleFormSubmission } from "@/features/projected-financial-assets/utils/handleAssetFormSubmission";
import { DashboardState } from "@/types/dashboard";

const currentYear = Number(new Date().getFullYear().toString());

// Define form data type (customize as needed)
interface FormData {
  [key: string]: number; // Example: adjust based on your actual form fields
}

const DEFAULT_RETIREMENT_YEAR = currentYear + 40;

/**
 * Handles all of the state for the dashboard page.
 * @returns Dashboard state and functions to handle the dashboard
 */
export const useDashboard = (): DashboardState => {
  const [selectedYear, setSelectedYear] = useState<number>(currentYear + 40);
  const [selectedFilter, setSelectedFilter] =
    useState<InflationFilters>("withNoInflation");
  const [retirementYear, setRetirementYear] = useState(DEFAULT_RETIREMENT_YEAR);

  const {
    futureProjectionData,
    futureProjectionError,
    futureProjectionLoading,
  } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });

  const { mutateAssets, isLoadingAssets, isErrorAssets } = useUpdateAssets();

  const { user, error: userError } = useFetchUser();

  const form = useForm<FormData, any, undefined>({
    defaultValues: {},
  }) as UseFormReturn<FormData, any, undefined>;

  const [mode, setMode] = useState<"edit" | "view">("view");

  const handleModeChange = useCallback((mode: "edit" | "view") => {
    setMode(mode);
  }, []);


  const assets = useMemo(() => {
    return futureProjectionData?.projected_assets?.[0]?.data || [];
  }, [futureProjectionData]);

  return useMemo(
    () => ({
      selectedYear,
      selectedFilter,
      futureProjectionData,
      futureProjectionError,
      futureProjectionLoading,
      user,
      userError,
      isLoadingAssets,
      form,
      mode,
      assets,
      retirementYear,
      handleModeChange,
      mutateAssets,
    }),
    [
      selectedYear,
      selectedFilter,
      futureProjectionData,
      futureProjectionError,
      futureProjectionLoading,
      user,
      userError,
      isLoadingAssets,
      form,
      mode,
      assets,
      retirementYear,
      handleModeChange,
      mutateAssets,
    ]
  );
};
