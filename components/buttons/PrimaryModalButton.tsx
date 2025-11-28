import React from "react";

import { cn } from "@/lib/utils";

interface PrimaryModalButtonProp {
  ref: React.Ref<HTMLButtonElement>;
  label: string;
  className: string;
}

const PrimaryModalButton = ({
  ref,
  label,
  className,
}: PrimaryModalButtonProp) => {
  const defaultClass = "";
  return (
    <button ref={ref} className={cn(defaultClass, className)}>
      {label}
    </button>
  );
};

export default PrimaryModalButton;
