import React from "react";
import { useFormStatus } from "react-dom";
import DotLoader from "@/components/loading/DotLoader";
import { SubmitButtonPropsV2 } from "@/types/buttons";
import { cn } from "@/lib/utils";

const PrimarySubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonPropsV2 & React.ButtonHTMLAttributes<HTMLButtonElement>>(({
  text = "Submit",
  className,
  isLoading, 
}, ref) => {
  const { pending } = useFormStatus();
  const defaultClass = `flex items-center justify-center w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300`

  return (
    <button type="submit" className={cn(defaultClass, className)} disabled={pending || isLoading} ref={ref}>
      {pending || isLoading ? (
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
});

export default PrimarySubmitButton;
