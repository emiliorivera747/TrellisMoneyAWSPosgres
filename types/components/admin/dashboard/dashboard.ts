import { UseFormReturn } from "react-hook-form";

/**
 * Represents form data with string keys and number values.
 * @export
 * @interface FormData
 */
export interface FormData {
  /**
   * The key-value pairs of the form data.
   * @type {number}
   * @memberof FormData
   */
  [key: string]: number;
}

/**
 * State for the dashboard page.
 * @export
 * @interface AssetsFormState
 */
export interface AssetsFormState {
  /**
   * Form for the asset card.
   * @type {UseFormReturn<FormData>}
   * @memberof AssetsFormState
   */
  form: UseFormReturn<FormData>;

  /**
   * Function to reset the form.
   * @type {() => void}
   * @memberof AssetsFormState
   */
  resetForm: () => void;
}

/**
 * Represents the properties for the Net Value Display Card component.
 * This interface defines the structure of the data required to render
 * the card, including its title, values, labels, and modal details.
 * @export
 * @interface NetValueDisplayCardProps
 */
export interface NetValueDisplayCardProps {
  /**
   * The title displayed on the card.
   * @type {string}
   * @memberof NetValueDisplayCardProps
   */
  title: string;

  /**
   * The label for the link displayed on the card.
   * @type {string}
   * @memberof NetValueDisplayCardProps
   */
  linkLabel: string;

  /**
   * The URL for the link displayed on the card.
   * @type {string}
   * @memberof NetValueDisplayCardProps
   */
  linkUrl: string;

  /**
   * The primary value displayed prominently on the card.
   * @type {number}
   * @memberof NetValueDisplayCardProps
   */
  primaryValue: number;

  /**
   * The secondary value displayed on the card.
   * @type {number}
   * @memberof NetValueDisplayCardProps
   */
  secondaryValue: number;

  /**
   * The label associated with the secondary value.
   * @type {string}
   * @memberof NetValueDisplayCardProps
   */
  secondaryLabel: string;

  /**
   * The label associated with the tertiary value.
   * @type {string}
   * @memberof NetValueDisplayCardProps
   */
  tertiaryLabel: string;

  /**
   * The tertiary value displayed on the card.
   * @type {number}
   * @memberof NetValueDisplayCardProps
   */
  tertiaryValue: number;

  /**
   * The description text displayed in the modal associated with the card.
   * @type {string}
   * @memberof NetValueDisplayCardProps
   */
  modalDescription: string;

  /**
   * The title displayed in the modal associated with the card.
   * @type {string}
   * @memberof NetValueDisplayCardProps
   */
  modalTitle: string;

  /**
   * Indicates whether the card is in a loading state.
   * @type {boolean}
   * @memberof NetValueDisplayCardProps
   */
  isLoading: boolean;
}
