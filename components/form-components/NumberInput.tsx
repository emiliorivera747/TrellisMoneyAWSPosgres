import React from "react";
import { FieldValues } from "react-hook-form";

//Components
import PrimaryInputLabel from "@/components/form-components/PrimaryInputLabel";
import ErrorForInputs from "@/components/errors/ErrorForInputs";

//Interface
import { NumberInputProps } from "@/types/forms";

const NumberInput = <TFieldValues extends FieldValues>({
  type = "number",
  id,
  fieldName,
  placeholder = "",
  errors,
  defaultValue = 0,
  pt = "pt-[1.05882rem]",
  px = "px-[1rem]",
  h = "h-[3.2941176471rem]",
  w = "w-[4rem]",
  rounded = "rounded-[12px]",
  errTextSize = "text-sm",
  withPlaceholder = false,
  min = 0,
  max = 100,
  register,
}: NumberInputProps<TFieldValues>) => {
  return (
    <div className="relative my-2">
      {/* <input
        type={type}
        id={id}
        min={min}
        max={max}
        {...register(fieldName, { valueAsNumber: true })}
        className={`border-box ${rounded} align-text-bottom ${w} ${px} ${pt} ${h} border leading-[1.23536] ${
          errors[fieldName]
            ? "border-red-500 bg-[#fff5f5] text-red-500"
            : "border-tertiary-600"
        } ${rounded} focus:outline-none focus:ring-2 ${
          errors[fieldName]
            ? "focus:ring-red-500"
            : "focus:ring-primary-500 focus:border-none"
        }`}
      /> */}

      {/* Placeholder label*/}
      {withPlaceholder && (
        <PrimaryInputLabel
          id={id}
          fieldName={fieldName}
          placeholder={placeholder}
          errors={errors}
        />
      )}

      {/* Error message */}
      <ErrorForInputs
        fieldName={fieldName}
        errors={errors}
        textSize={errTextSize}
      />
    </div>
  );
};
export default NumberInput;
