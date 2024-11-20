import React from "react";
import { useFormStatus } from "react-dom";
import ButtonSpinner from "../spinners/ButtonSpinner";

interface SubmitButtonProps {
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
  text: string;
}
const PrimarySubmitButton = ({
  bgColor,
  textColor,
  hoverBgColor,
  text,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full ${bgColor} ${textColor} px-[.94118rem] py-[1.05882rem] rounded-[12px] ${hoverBgColor} transition duration-300`}
      disabled={pending}
    >
      {pending ? <ButtonSpinner /> : text}
    </button>
  );
};

export default PrimarySubmitButton;
