"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import { AssetsFormState} from "@/types/dashboard";


// Define form data type (customize as needed)
interface FormData {
  [key: string]: number; // Example: adjust based on your actual form fields
}

/**
 * Handles all of the state for the dashboard page.
 * @returns Dashboard state and functions to handle the dashboard
 */
export const useAssetsForm = (): AssetsFormState => {
  const form = useForm<FormData, any, undefined>({
    defaultValues: {},
  }) as UseFormReturn<FormData, any, undefined>;

  return { form };
};
