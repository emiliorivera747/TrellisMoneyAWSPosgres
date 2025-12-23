"use client";
import { FieldValues } from "react-hook-form";

import { TextInputV2Props } from "@/types/forms";

import PrimaryInputLabel from "@/components/form-components/PrimaryInputLabel";
import ErrorForInputs from "@/components/errors/ErrorForInputs";

const TextInputV2 = <TFieldValues extends FieldValues>({
  control,
  name,
  type = "text",
  id,
  placeholder = "",
  defaultValue = "",
  pt = "pt-[1.05882rem]",
  px = "px-[1rem]",
  h = "h-[3.2941176471rem]",
  w = "w-full",
}: TextInputV2Props<TFieldValues>) => {
  return (
    <div className="relative my-2">
      <input
        type={type}
        id={id}
        {...control.register(name)}
        className={`border-box rounded-[12px] align-text-bottom ${w} ${px} ${pt} ${h} border leading-[1.23536] ${
          control._formState.errors[name]
            ? "border-red-500 bg-[#fff5f5] text-red-500"
            : "border-tertiary-600 bg-zinc-50"
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

export default TextInputV2;
