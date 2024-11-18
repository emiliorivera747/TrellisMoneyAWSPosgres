import React from "react";

interface SubmitButtonProps {
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
  text: string;
  disabled: boolean;
}
const PrimarySubmitButton = ({
  bgColor,
  textColor,
  hoverBgColor,
  text,
  disabled,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`w-full ${bgColor} ${textColor} px-[.94118rem] py-[1.05882rem] rounded-[12px] ${hoverBgColor} transition duration-300`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimarySubmitButton;
