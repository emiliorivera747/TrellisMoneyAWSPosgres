import React from "react";
import { useFormStatus } from "react-dom";
import DotLoader from "@/components/loading/DotLoader";
interface SubmitButtonProps {
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
}

const PrimarySubmitButton = ({
  bgColor = "bg-blue-500",
  textColor = "text-white",
  hoverBgColor = "hover:bg-blue-700",
  text = "Submit",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full ${bgColor} ${textColor} px-[.94118rem] py-[1.05882rem] rounded-[12px] ${hoverBgColor} transition duration-300`}
      disabled={pending}
    >
      {pending ? (
        <DotLoader
          bgColor="bg-blue-200"
          dotHeight="h-2"
          dotWidth="w-2"
          containerHeight="h-5"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default PrimarySubmitButton;
