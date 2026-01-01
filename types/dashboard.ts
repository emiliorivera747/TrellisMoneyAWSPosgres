import { UseFormReturn } from "react-hook-form";
export interface FormData {
  [key: string]: number;
}

/**
 *  State for the dashboard page
 */
export interface AssetsFormState {
  /**
   * Form for the asset card
   */
  form: UseFormReturn<FormData>;

  resetForm: () => void;
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
