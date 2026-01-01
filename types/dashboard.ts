import { useForm } from "react-hook-form";

interface CustomFormData {
  [key: string]: any;
}

/**
 *  State for the dashboard page
 */
export interface AssetsFormState {

  /**
   * Form for the asset card
   */
  form: ReturnType<typeof useForm>;

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
