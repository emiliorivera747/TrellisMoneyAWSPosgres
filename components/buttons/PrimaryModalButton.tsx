import React from "react";
import { cn } from "@/lib/utils";
import { PrimaryModalButtonProp } from "@/types/buttons";

/**
 * The primary button that will be used for modals
 */
const PrimaryModalButton = ({
  onClickFn,
  ref,
  label,
  className,
}: PrimaryModalButtonProp) => {
  const defaultClass = "px-4 py-2 bg-primary-700 text-white rounded-[12px]";
  return (
    <button
      ref={ref}
      onClick={onClickFn}
      className={cn(defaultClass, className)}
    >
      {label}
    </button>
  );
};

export default PrimaryModalButton;
