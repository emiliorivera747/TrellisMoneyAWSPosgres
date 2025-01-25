import React from "react";
import { useFormStatus } from "react-dom";
import DotLoader from "@/components/loading/DotLoader";
import { SubmitButtonProps } from "@/types/buttons";

import { cn } from "@/lib/utils";

const PrimarySubmitButton = ({
  text = "Submit",
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const defaultClass = `flex items-center justify-center w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300`

  return (
    <button type="submit" className={cn(defaultClass, className)} disabled={pending}>
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
