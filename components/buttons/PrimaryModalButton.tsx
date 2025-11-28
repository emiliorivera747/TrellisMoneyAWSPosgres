import React from "react";

import { cn } from "@/lib/utils";

interface PrimaryModalButtonProp {
  ref: React.Ref<HTMLButtonElement>;
  label: string;
  className: string;
  onClickFn: React.MouseEventHandler<HTMLButtonElement>;
}

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
