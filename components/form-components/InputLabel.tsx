import React from "react";

interface InputLabelProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  errors: any;
  register: any;
}
const InputLabel = ({
  type,
  id,
  name,
  placeholder,
  errors,
  register,
}: InputLabelProps) => {
  return (
    <div className="relative my-1">
      <input
      type={type}
      id={id}
      {...register(name)}
      className={`align-text-bottom w-full px-[.94118rem] pt-[1.05882rem] h-[3.29412rem] border ${
        errors[name] ? "border-red-500" : "border-[#495057]"
      } rounded-[8px] focus:outline-none focus:ring-2 ${
        errors[name] ? "focus:ring-red-500" : "focus:ring-blue-500"
      } peer placeholder-transparent`}
      placeholder={placeholder}
      defaultValue=""
      />
      <label
      htmlFor={id}
      className="absolute text-sm left-4 top-2 peer-focus:top-2 peer-focus:left-4 peer-focus:text-sm pb-4 peer-focus:text-[#868e96] text-[#868e96] peer-focus:font-light font-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#868e96] peer-placeholder-shown:font-normal peer-autofill:top-2 peer-autofill:left-4 peer-autofill:text-sm"
      >
      {placeholder}
      </label>
      {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputLabel;
