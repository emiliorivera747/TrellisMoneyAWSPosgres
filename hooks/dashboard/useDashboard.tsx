"use client";
import { useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

import useFetchUser from "@/hooks/user/useFetchUser";
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
export const useDashboard = (): DashboardState => {
  const { user, error: userError } = useFetchUser();

  const form = useForm<FormData, any, undefined>({
    defaultValues: {},
  }) as UseFormReturn<FormData, any, undefined>;

  return useMemo(
    () => ({
      user,
      userError,

      form,
    }),
    [user, userError, form]
  );
};
