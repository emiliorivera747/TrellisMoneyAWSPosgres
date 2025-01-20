import React from "react";
import { useFormStatus } from "react-dom";
import DotLoader from "@/components/loading/DotLoader";
import { SubmitButtonProps } from "@/types/buttons";

const PrimarySubmitButton = ({
  bgColor = "bg-blue-500",
  textColor = "text-white",
  hoverBgColor = "hover:bg-blue-700",
  text = "Submit",
  withLinearGradient = true,
  bgFrom = "from-primary-700",
  bgTo = "to-primary-800",
  hoverBgFrom = "hover:from-blue-700",
  hoverBgTo = "hover:to-blue-700",
  w = "w-full",
  px = "px-[.94118rem]",
  py = "py-[1.05882rem]",
  h = "h-[3.2941176471rem]",
  rounded = "rounded-[12px]",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  const buttonClass = withLinearGradient
    ? `flex items-center justify-center ${w} bg-gradient-to-r ${bgFrom} ${bgTo} ${textColor}  ${px} ${py} ${h} ${rounded} ${hoverBgFrom} ${hoverBgTo} transition duration-300`
    : `flex items-center justify-center ${w} ${bgColor} ${textColor} ${px} ${py} ${h} ${rounded} ${hoverBgColor} transition duration-300`;

  return (
    <button type="submit" className={buttonClass} disabled={pending}>
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
