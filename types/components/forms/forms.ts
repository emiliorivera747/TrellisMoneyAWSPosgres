import {
  UseFormRegister,
  Path,
  FieldValues,
  FieldErrors,
  Control,
} from "react-hook-form";

/**
 * Represents the properties for a password input component.
 * @export
 * @interface PasswordInputProps
 * @template TFieldValues - The type of the form field values.
 */
export interface PasswordInputProps<TFieldValues extends FieldValues> {
  /**
   * The input ID.
   * @type {string}
   * @memberof PasswordInputProps
   */
  id?: string;
  /**
   * The placeholder text.
   * @type {string}
   * @memberof PasswordInputProps
   */
  placeholder?: string;
  /**
   * The field name.
   * @type {Path<TFieldValues>}
   * @memberof PasswordInputProps
   */
  fieldName: Path<TFieldValues>;
  /**
   * The field errors.
   * @type {FieldErrors<TFieldValues>}
   * @memberof PasswordInputProps
   */
  errors: FieldErrors<TFieldValues>;
  /**
   * The form register function.
   * @type {UseFormRegister<TFieldValues>}
   * @memberof PasswordInputProps
   */
  register: UseFormRegister<TFieldValues>;
  /**
   * Whether to show password tooltip.
   * @type {boolean}
   * @memberof PasswordInputProps
   */
  withPasswordTooltip?: boolean;
  /**
   * Function to set focus state.
   * @type {React.Dispatch<React.SetStateAction<boolean>>}
   * @memberof PasswordInputProps
   */
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Function to set password value.
   * @type {React.Dispatch<React.SetStateAction<string>>}
   * @memberof PasswordInputProps
   */
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Represents the properties for a number input component.
 * @export
 * @interface NumberInputProps
 * @template TFieldValues - The type of the form field values.
 */
export interface NumberInputProps<TFieldValues extends FieldValues> {
  /**
   * The input type.
   * @type {"number"}
   * @memberof NumberInputProps
   */
  type?: "number";
  /**
   * The input ID.
   * @type {string}
   * @memberof NumberInputProps
   */
  id: string;
  /**
   * The placeholder text.
   * @type {string}
   * @memberof NumberInputProps
   */
  placeholder?: string;
  /**
   * The default value.
   * @type {number}
   * @memberof NumberInputProps
   */
  defaultValue?: number;
  /**
   * The field name.
   * @type {string}
   * @memberof NumberInputProps
   */
  fieldName: string;
  /**
   * The field errors.
   * @type {FieldErrors<TFieldValues>}
   * @memberof NumberInputProps
   */
  errors: FieldErrors<TFieldValues>;
  /**
   * The form register function.
   * @type {UseFormRegister<TFieldValues>}
   * @memberof NumberInputProps
   */
  register: UseFormRegister<TFieldValues>;
  /**
   * Padding top.
   * @type {string}
   * @memberof NumberInputProps
   */
  pt?: string;
  /**
   * Padding horizontal.
   * @type {string}
   * @memberof NumberInputProps
   */
  px?: string;
  /**
   * Height.
   * @type {string}
   * @memberof NumberInputProps
   */
  h?: string;
  /**
   * Width.
   * @type {string}
   * @memberof NumberInputProps
   */
  w?: string;
  /**
   * Border radius.
   * @type {string}
   * @memberof NumberInputProps
   */
  rounded?: string;
  /**
   * Error text size.
   * @type {string}
   * @memberof NumberInputProps
   */
  errTextSize?: string;
  /**
   * Whether to show placeholder.
   * @type {boolean}
   * @memberof NumberInputProps
   */
  withPlaceholder?: boolean;
  /**
   * Minimum value.
   * @type {number}
   * @memberof NumberInputProps
   */
  min?: number;
  /**
   * Maximum value.
   * @type {number}
   * @memberof NumberInputProps
   */
  max?: number;
}

/**
 * Represents the properties for a number input component version 2.
 * @export
 * @interface NumberInputV2Props
 */
export interface NumberInputV2Props {
  /**
   * The input type.
   * @type {"number"}
   * @memberof NumberInputV2Props
   */
  type?: "number";
  /**
   * CSS class name.
   * @type {string}
   * @memberof NumberInputV2Props
   */
  className?: string;
  /**
   * Reference to the input element.
   * @type {React.Ref<HTMLInputElement>}
   * @memberof NumberInputV2Props
   */
  ref: React.Ref<HTMLInputElement>;
}

/**
 * Represents the properties for a text input component.
 * @export
 * @interface TextInputProps
 * @template TFieldValues - The type of the form field values.
 */
export interface TextInputProps<TFieldValues extends FieldValues> {
  /**
   * The input type.
   * @type {"email" | "text" | "url" | "search" | "tel"}
   * @memberof TextInputProps
   */
  type: "email" | "text" | "url" | "search" | "tel";
  /**
   * The input ID.
   * @type {string}
   * @memberof TextInputProps
   */
  id: string;
  /**
   * The placeholder text.
   * @type {string}
   * @memberof TextInputProps
   */
  placeholder: string;
  /**
   * The default value.
   * @type {string | number}
   * @memberof TextInputProps
   */
  defaultValue?: string | number;
  /**
   * The field name.
   * @type {Path<TFieldValues>}
   * @memberof TextInputProps
   */
  fieldName: Path<TFieldValues>;
  /**
   * The field errors.
   * @type {FieldErrors<TFieldValues>}
   * @memberof TextInputProps
   */
  errors: FieldErrors<TFieldValues>;
  /**
   * The form register function.
   * @type {UseFormRegister<TFieldValues>}
   * @memberof TextInputProps
   */
  register: UseFormRegister<TFieldValues>;
  /**
   * Padding top.
   * @type {string}
   * @memberof TextInputProps
   */
  pt?: string;
  /**
   * Padding horizontal.
   * @type {string}
   * @memberof TextInputProps
   */
  px?: string;
  /**
   * Height.
   * @type {string}
   * @memberof TextInputProps
   */
  h?: string;
  /**
   * Width.
   * @type {string}
   * @memberof TextInputProps
   */
  w?: string;
}

/**
 * Represents the properties for a primary input label component.
 * @export
 * @interface PrimaryInputLabelProps
 * @template TFieldValues - The type of the form field values.
 */
export interface PrimaryInputLabelProps<TFieldValues extends FieldValues> {
  /**
   * The input ID.
   * @type {string}
   * @memberof PrimaryInputLabelProps
   */
  id: string;
  /**
   * The field name.
   * @type {string}
   * @memberof PrimaryInputLabelProps
   */
  fieldName: string;
  /**
   * The placeholder text.
   * @type {string}
   * @memberof PrimaryInputLabelProps
   */
  placeholder: string;
  /**
   * The field errors.
   * @type {FieldErrors<TFieldValues>}
   * @memberof PrimaryInputLabelProps
   */
  errors: FieldErrors<TFieldValues>;
}

/**
 * Represents the properties for an error component for inputs.
 * @export
 * @interface ErrorForInputsProps
 * @template TFieldValues - The type of the form field values.
 */
export interface ErrorForInputsProps<TFieldValues extends FieldValues> {
  /**
   * The field name.
   * @type {string}
   * @memberof ErrorForInputsProps
   */
  fieldName: string;
  /**
   * The text size for the error message.
   * @type {string}
   * @memberof ErrorForInputsProps
   */
  textSize?: string;
  /**
   * The field errors.
   * @type {FieldErrors<TFieldValues>}
   * @memberof ErrorForInputsProps
   */
  errors: FieldErrors<TFieldValues>;
}

/**
 * Represents input data structure.
 * @export
 * @interface Input
 */
export interface Input {
  /**
   * The email address.
   * @type {string}
   * @memberof Input
   */
  email: string;
  /**
   * The password.
   * @type {string}
   * @memberof Input
   */
  password1: string;
}

/**
 * Represents a form field configuration.
 * @export
 * @typedef {Object} FormField
 * @template TFieldValues - The type of the form field values.
 * @property {Control<TFieldValues>} [control] - The form control.
 * @property {string} name - The field name.
 * @property {string} id - The field ID.
 * @property {string} placeholder - The placeholder text.
 * @property {string} type - The input type.
 */
export type FormField<TFieldValues extends FieldValues> = {
  /**
   * The form control.
   * @type {Control<TFieldValues>}
   * @memberof FormField
   */
  control?: Control<TFieldValues>;
  /**
   * The field name.
   * @type {string}
   * @memberof FormField
   */
  name: string;
  /**
   * The field ID.
   * @type {string}
   * @memberof FormField
   */
  id: string;
  /**
   * The placeholder text.
   * @type {string}
   * @memberof FormField
   */
  placeholder: string;
  /**
   * The input type.
   * @type {string}
   * @memberof FormField
   */
  type: string;
};

/**
 * Represents the properties for a form field generator component.
 * @export
 * @interface FormFieldGeneratorProps
 */
export interface FormFieldGeneratorProps {
  /**
   * The form fields to generate.
   * @type {FormField<FieldValues>[]}
   * @memberof FormFieldGeneratorProps
   */
  fields: FormField<FieldValues>[];
}

/**
 * Represents the properties for a text input component version 2.
 * @export
 * @interface TextInputV2Props
 * @template TFieldValues - The type of the form field values.
 */
export interface TextInputV2Props<TFieldValues extends FieldValues> {
  /**
   * The form control.
   * @type {Control<TFieldValues>}
   * @memberof TextInputV2Props
   */
  control: Control<TFieldValues>;
  /**
   * The field name.
   * @type {Path<TFieldValues>}
   * @memberof TextInputV2Props
   */
  name: Path<TFieldValues>;
  /**
   * The input type.
   * @type {string}
   * @memberof TextInputV2Props
   */
  type?: string;
  /**
   * The input ID.
   * @type {string}
   * @memberof TextInputV2Props
   */
  id: string;
  /**
   * The placeholder text.
   * @type {string}
   * @memberof TextInputV2Props
   */
  placeholder?: string;
  /**
   * The default value.
   * @type {string}
   * @memberof TextInputV2Props
   */
  defaultValue?: string;
  /**
   * Padding top.
   * @type {string}
   * @memberof TextInputV2Props
   */
  pt?: string;
  /**
   * Padding horizontal.
   * @type {string}
   * @memberof TextInputV2Props
   */
  px?: string;
  /**
   * Height.
   * @type {string}
   * @memberof TextInputV2Props
   */
  h?: string;
  /**
   * Width.
   * @type {string}
   * @memberof TextInputV2Props
   */
  w?: string;
}

/**
 * Represents form field data structure.
 * @export
 * @interface FormFieldData
 * @template TFieldValues - The type of the form field values.
 */
export interface FormFieldData<TFieldValues extends FieldValues> {
  /**
   * The field ID.
   * @type {string}
   * @memberof FormFieldData
   */
  id: string;
  /**
   * The field name.
   * @type {Path<TFieldValues>}
   * @memberof FormFieldData
   */
  name: Path<TFieldValues>;
  /**
   * The placeholder text.
   * @type {string}
   * @memberof FormFieldData
   */
  placeholder: string;
  /**
   * The input type.
   * @type {string}
   * @memberof FormFieldData
   */
  type: string;
  /**
   * The form control.
   * @type {Control<TFieldValues>}
   * @memberof FormFieldData
   */
  control?: Control<TFieldValues>;
}
