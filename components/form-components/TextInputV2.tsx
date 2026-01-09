"use client";
import { FieldValues } from "react-hook-form";

import { TextInputV2Props } from "@/types/components/forms/forms";

import PrimaryInputLabel from "@/components/form-components/PrimaryInputLabel";
import ErrorForInputs from "@/components/errors/ErrorForInputs";

/**
 * A reusable text input component with customizable styles and validation support.
 * This component is designed to work with React Hook Form for form state management.
 *
 * @template TFieldValues - The type of the form values managed by React Hook Form.
 *
 * @param {Object} props - The properties for the TextInput component.
 * @param {Control<TFieldValues>} props.control - The control object from React Hook Form.
 * @param {string} props.name - The name of the field, used for form registration and validation.
 * @param {string} [props.type="text"] - The type of the input field (e.g., "text", "password").
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} [props.placeholder=""] - The placeholder text for the input field.
 * @param {string} [props.defaultValue=""] - The default value for the input field.
 * @param {string} [props.pt="pt-[1.05882rem]"] - The padding-top CSS class for the input field.
 * @param {string} [props.px="px-[1rem]"] - The padding-x CSS class for the input field.
 * @param {string} [props.h="h-[3.2941176471rem]"] - The height CSS class for the input field.
 * @param {string} [props.w="w-full"] - The width CSS class for the input field.
 *
 * @returns {JSX.Element} A styled text input field with validation error handling and a placeholder label.
 *
 * @remarks
 * - The component uses `control.register` to register the input field with React Hook Form.
 * - Validation errors are displayed using the `ErrorForInputs` component.
 * - A floating label is implemented using the `PrimaryInputLabel` component.
 * - The input field dynamically updates its styles based on validation state.
 */
const TextInput = <TFieldValues extends FieldValues>({
  control,
  name,
  type = "text",
  id,
  placeholder = "",
  defaultValue = "",
  pt = "pt-[1.05882rem]",
  px = "px-[1rem]",
  h = "h-[3.4rem]",
  w = "w-full",
}: TextInputV2Props<TFieldValues>) => {
  return (
    <div className="relative my-[0.2rem]">
      <input
        type={type}
        id={id}
        {...control.register(name)}
        className={`border-box rounded-[12px] align-text-bottom ${w} ${px} ${pt} ${h} border leading-[1.23536] ${
          control._formState.errors[name]
            ? "border-red-500 bg-[#FBFBFB] text-red-500"
            : "border-tertiary-600 bg-[#FBFBFB]"
        } rounded-[12px] focus:outline-none focus:ring-2 ${
          control._formState.errors[name]
            ? "focus:ring-red-500"
            : "focus:ring-primary-500 focus:border-none"
        } peer placeholder-transparent`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      {/* Placeholder label */}
      <PrimaryInputLabel
        id={id}
        fieldName={name}
        placeholder={placeholder}
        errors={control._formState.errors}
      />

      {/* Error message */}
      <ErrorForInputs fieldName={name} errors={control._formState.errors} />
    </div>
  );
};

export default TextInput;
