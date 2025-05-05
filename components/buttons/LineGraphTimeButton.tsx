import React from "react";
import { cn } from "@/lib/utils";

interface LineGraphTimeButtonProps {
  label: string;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
  onClick?: () => void;
}

const LineGraphTimeButton = ({
  label,
  ref,
  className,
  onClick,
}: LineGraphTimeButtonProps) => {
  const defaultClass =
    "font-bold rounded-[12px] text-tertiary-1000 border-tertiary-300 text-xs flex flex-row justify-center gap-2 p-3 px-4 hover:bg-tertiary-200 items-center h-4";
  return (
    <button onClick={onClick} className={cn(defaultClass, className)} ref={ref}>
      {label}
    </button>
  );
};

export default LineGraphTimeButton;
