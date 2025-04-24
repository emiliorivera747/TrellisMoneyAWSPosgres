"use client";
import { useState } from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/hooks/user/useFetchUser";
import useGenerateToken from "@/hooks/plaid/useGenerateToken";
import { handleFormSubmission } from "@/features/projected-financial-assets/utils/handleAssetFormSubmission";
import { DashboardState } from "@/types/dashboard";

// Hooks
import useFetchNetWorth from "@/features/net-worth/hooks/useFetchNetWorth";

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
export const useDashboard = (): DashboardState & {
  handleYearSelection: (year: number) => void;
  handleFilterChange: (filter: InflationFilters) => void;
  editRetirementYear: (year: number) => void;
  onSubmit: SubmitHandler<FormData>;
} => {
  const [selectedYear, setSelectedYear] = useState<number>(currentYear + 40);
  const [selectedFilter, setSelectedFilter] =
    useState<InflationFilters>("isNoInflation");
  const [retirementYear, setRetirementYear] = useState(DEFAULT_RETIREMENT_YEAR);

  const { projectionData, projectionError, projectionLoading } =
    useFetchProjections({
      selectedYear,
      selectedFilter,
    });

  /**
   * Function to edit the retirement year
   *
   * @param year
   */
  const editRetirementYear = (year: number) => {
    setRetirementYear(year);
    handleYearSelection(year);
  };

  const { netWorthData, netWorthError, netWorthLoading } = useFetchNetWorth();

  const {
    mutate: mutateAsset,
    isPending: isPendingAssets,
    isError: isErrorAssets,
  } = useUpdateAssets();

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
  const handleFilterChange = (filter: InflationFilters) =>
    setSelectedFilter(filter);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleFormSubmission(
      data,
      projectionData,
      selectedFilter,
      user,
      mutateAsset
    );
    setMode("view");
  };

  const assets = projectionData?.projected_assets?.[0]?.data || [];

  return {
    selectedYear,
    selectedFilter,
    projectionData,
    projectionError,
    projectionLoading,
    user,
    userError,
    linkToken,
    isPendingAssets,
    form,
    mode,
    netWorthData,
    netWorthError,
    netWorthLoading,
    assets,
    retirementYear,
    editRetirementYear,
    handleModeChange,
    mutateAsset,
    handleYearSelection,
    handleFilterChange,
    onSubmit,
  };
};
