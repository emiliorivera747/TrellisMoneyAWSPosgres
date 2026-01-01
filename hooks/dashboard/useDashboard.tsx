"use client";
import { useForm } from "react-hook-form";
import { AssetsFormState } from "@/types/dashboard";

export interface FormData {
  [key: string]: number;
}

/**
 * Handles all of the state for the dashboard page.
 * @returns Dashboard state and functions to handle the dashboard
 */
export const useAssetsForm = (): AssetsFormState => {
  const form = useForm<FormData>({
    defaultValues: {},
  });

  return { form };
};
