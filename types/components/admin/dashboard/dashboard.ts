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

/**
 * Represents the properties for the Net Value Display Card component.
 * This interface defines the structure of the data required to render
 * the card, including its title, values, labels, and modal details.
 */
export interface NetValueDisplayCardProps {
  /**
   * The title displayed on the card.
   */
  title: string;

  /**
   * The label for the link displayed on the card.
   */
  linkLabel: string;

  /**
   * The URL for the link displayed on the card.
   */
  linkUrl: string;

  /**
   * The primary value displayed prominently on the card.
   */
  primaryValue: number;

  /**
   * The secondary value displayed on the card.
   */
  secondaryValue: number;

  /**
   * The label associated with the secondary value.
   */
  secondaryLabel: string;

  /**
   * The label associated with the tertiary value.
   */
  tertiaryLabel: string;

  /**
   * The tertiary value displayed on the card.
   */
  tertiaryValue: number;

  /**
   * The description text displayed in the modal associated with the card.
   */
  modalDescription: string;

  /**
   * The title displayed in the modal associated with the card.
   */
  modalTitle: string;

  /**
   * Indicates whether the card is in a loading state.
   */
  isLoading: boolean;
}
