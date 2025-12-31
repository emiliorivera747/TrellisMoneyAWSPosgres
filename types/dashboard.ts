import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import { useForm } from "react-hook-form";
import { FutureProjectionData } from "@/features/projected-financial-assets/types/projectedAssets";
import { User } from "@/types/user";
import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { SubmitHandler } from "react-hook-form";
interface CustomFormData {
  [key: string]: any;
}

/**
 *  State for the dashboard page
 */
export interface DashboardState {
  /**
   * The selected year for the dashboard
   */
  selectedYear: number;

  /**
   * The selected filter for the dashboard
   * may be one of the following:
   * - withNoInflation
   * - isBoth
   * - withInflation
   */
  selectedFilter: InflationFilters;

  /**
   * The future projections assets and net worth data
   */
  futureProjectionData: FutureProjectionData | null | undefined;

  /**
   * The error for the future projections
   */
  futureProjectionError: any;

  /**
   * The loading state for the future projections
   */
  futureProjectionLoading: boolean;

  /**
   * The user data
   */
  user: User | null;

  /**
   * The error for the user data
   */
  userError: any;

  /**
   * The link token for plaid
   */
  linkToken: string | null;

  /**
   * The loading state for the assets after updating
   */
  isLoadingAssets: boolean;

  // /**
  //  * Net worth data included assets and liabilities
  //  */
  // netWorthData: {
  //   data: { netWorth: number; assets: number; liabilities: number };
  // } | null;

  /**
   * Assets data
   */
  assets: Assets[];

  // /**
  //  * The error for the net worth data
  //  */
  // netWorthError: any;

  // /**
  //  * The loading state for the net worth data
  //  */
  // netWorthLoading: boolean;

  /**
   * The mode for the asset card
   */
  mode: "edit" | "view";

  /**
   * The year the user is retiring
   */
  retirementYear: number;

  /**
   * Updates the mode for the asset card
   *
   * @returns
   */
  handleModeChange: (mode: "edit" | "view") => void;

  /**
   * Form for the asset card
   */
  form: ReturnType<typeof useForm>;

  /**
   * React Query function to update the asset
   *
   * @param asset
   * @returns
   */
  mutateAssets: (asset: any) => void;

  /**
   *
   * Handles the year selection for the dashboard
   *
   * @param year
   * @returns
   */
  handleYearSelection: (year: number) => void;

  /**
   * Handles the filter selection for the dashboard
   *
   * @param filter
   * @returns
   */
  handleFilterChange: (filter: InflationFilters) => void;

  /**
   * Edits the retirement year for the dashboard
   *
   * @param year
   * @returns
   */
  editRetirementYear: (year: number) => void;

  /**
   * Handles the form submission for the dashboard
   *
   * @param data
   * @returns
   */
  onSubmit: SubmitHandler<CustomFormData>;
}

export interface NetValueDisplayCardProps {
  title: string;
  linkLabel: string;
  linkUrl: string;
  primaryValue: number;
  secondaryValue: number;
  secondaryLabel: string;
  tertiaryLabel: string;
  tertiaryValue: number;
  modalDescription: string;
  modalTitle: string;
  isLoading: boolean;
}
