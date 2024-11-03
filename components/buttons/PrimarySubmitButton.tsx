import React from "react";

interface SubmitButtonProps {
    bgColor: string;
    textColor: string;
    hoverBgColor: string;
    text: string;
}
const PrimarySubmitButton = ({bgColor, textColor, hoverBgColor, text }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`w-full ${bgColor} ${textColor} px-[.94118rem] py-[1.05882rem] rounded-[12px] ${hoverBgColor} transition duration-300`}
    >
      {text}
    </button>
  );
};

export default PrimarySubmitButton;
