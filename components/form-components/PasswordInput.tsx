import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FieldValues } from "react-hook-form";

//Components
import PasswordTooltip from "@/features/auth/components/tooltips/PasswordTooltip";

//Types
import { PasswordInputProps } from "@/types/Forms";

const PasswordInput = <TFieldValues extends FieldValues>({
  id,
  placeholder,
  fieldName,
  errors,
  register,
}: PasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target instanceof Element && !event.target.closest(`#${id}`)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative my-1 ">
      <input
        type={"password"}
        id={id}
        {...register(fieldName, {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value),
        })}
        className={`align-text-bottom w-full px-[.94118rem] pt-[1.05882rem] h-[3.29412rem] border ${
          errors[fieldName] ? "border-red-500" : "border-[#495057]"
        } rounded-[8px] focus:outline-none focus:ring-2 ${
          errors[fieldName] ? "focus:ring-red-500" : "focus:ring-blue-500"
        } peer placeholder-transparent`}
        placeholder={placeholder}
        defaultValue=""
        onFocus={() => setIsFocused(true)}
      />

      {/* Password Visibility */}
      <div
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer  h-[3.29412rem]"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <FaEyeSlash className="text-[#868e96]" />
        ) : (
          <FaEye className="text-[#868e96]" />
        )}
      </div>

      {/* Password tooltip */}
      {isFocused && password && <PasswordTooltip password={password} />}

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
export default PasswordInput;
