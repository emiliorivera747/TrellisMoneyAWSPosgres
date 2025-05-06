import React from "react";
import {
  AlertDialogCancel,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";

interface ModalHeaderProps {
  title: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 *
 * Responsible for showing the header of the modal
 *
 * @param name - The title of the modal
 * @returns
 */
const ModalHeader = ({ title, ref, className }: ModalHeaderProps) => {
  const defaultClass =
    "flex justify-between items-center border-b border-tertiary-200 pb-4 pt-2 mb-2";
  return (
    <header ref={ref} className={cn(defaultClass, className)}>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogCancel className="flex items-center justify-center border-none shadow-none rounded-full h-10 w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </AlertDialogCancel>
    </header>
  );
};

export default ModalHeader;
