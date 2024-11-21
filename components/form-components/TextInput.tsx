import React from "react";
import {
  FieldValues,
} from "react-hook-form";


//Interface
import {TextInputProps} from "@/types/Forms";

const TextInput = <TFieldValues extends FieldValues> ({
  type,
  id,
  fieldName,
  placeholder,
  errors,
  register,
}: TextInputProps<TFieldValues>) => {

  return (
    <div className="relative my-1 ">
      <input
        type={type}
        id={id}
        {...register(fieldName)}
        className={`align-text-bottom w-full px-[.94118rem] pt-[1.05882rem] h-[3.29412rem] border ${
          errors[fieldName] ? "border-red-500" : "border-[#495057]"
        } rounded-[8px] focus:outline-none focus:ring-2 ${
          errors[fieldName] ? "focus:ring-red-500" : "focus:ring-blue-500"
        } peer placeholder-transparent`}
        placeholder={placeholder}
        defaultValue=""
      />

      {/* Placeholder label*/}
      <label
        htmlFor={id}
        className="absolute text-sm left-4 top-2 peer-focus:top-2 peer-focus:left-4 peer-focus:text-sm pb-4 peer-focus:text-[#868e96] text-[#868e96] peer-focus:font-light font-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#868e96] peer-placeholder-shown:font-normal peer-autofill:top-2 peer-autofill:left-4 peer-autofill:text-sm"
      >
        {placeholder}
      </label>

      {/* Error message */}
      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-1 ">
          {errors[fieldName]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
export default TextInput;
