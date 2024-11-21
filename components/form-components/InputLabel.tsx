import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

//Components
import PasswordTooltip from "@/features/auth/components/tooltips/PasswordTooltip";

interface Input {
  email: string;
}
interface InputLabelProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  errors: FieldError;
  register: UseFormRegister<Input>;
  passwordTooltip?: boolean;
}

const InputLabel = ({
  type,
  id,
  name,
  placeholder,
  errors,
  register,
  passwordTooltip,
}: InputLabelProps) => {
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
        type={type === "password" && showPassword ? "text" : type}
        id={id}
        {...register(name, {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value),
        })}
        className={`align-text-bottom w-full px-[.94118rem] pt-[1.05882rem] h-[3.29412rem] border ${
          errors[name] ? "border-red-500" : "border-[#495057]"
        } rounded-[8px] focus:outline-none focus:ring-2 ${
          errors[name] ? "focus:ring-red-500" : "focus:ring-blue-500"
        } peer placeholder-transparent`}
        placeholder={placeholder}
        defaultValue=""
        onFocus={() => setIsFocused(true)}
      />

      {/* Password visibility functionality */}
      {type === "password" && (
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
      )}

      {/* Password tooltip */}
      {type === "password" && isFocused && password && passwordTooltip && (
        <PasswordTooltip password={password} />
      )}

      {/* Placeholder label*/}
      <label
        htmlFor={id}
        className="absolute text-sm left-4 top-2 peer-focus:top-2 peer-focus:left-4 peer-focus:text-sm pb-4 peer-focus:text-[#868e96] text-[#868e96] peer-focus:font-light font-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#868e96] peer-placeholder-shown:font-normal peer-autofill:top-2 peer-autofill:left-4 peer-autofill:text-sm"
      >
        {placeholder}
      </label>

      {/* Error message */}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 ">{errors[name].message}</p>
      )}
    </div>
  );
};
export default InputLabel;
