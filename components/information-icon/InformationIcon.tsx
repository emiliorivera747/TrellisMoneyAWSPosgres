import React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InformationIconProps {
  size?: string;
  color?: string;
  strokeWidth?: number;
  ref?: React.Ref<SVGSVGElement>;
  modalTitle?: string;
  modalDescription?: string;
}

const InformationIcon = ({
  size = "size-6",
  color = "text-tertiary-800",
  strokeWidth = 1.5,
  ref,
  modalTitle = "Are you sure?",
  modalDescription = "This action cannot be undone.",
}: InformationIconProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger >
        <div className="h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            ref={ref}
            stroke="currentColor"
            className={`${size} ${color} hover:bg-tertiary-200  rounded h-full`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center w-full ">
            <div className="w-full">
              <div className="flex flex-row justify-between pb-2 w-full items-center">
                <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
                <AlertDialogCancel className="shadow-none" asChild>
                  <button
                    aria-label="Close"
                    className="rounded-full text-gray-500 hover:text-gray-700 border-none outline-none cursor-pointer p-2 transition-colors duration-200 ease-in-out"
                  >
                    ✕
                  </button>
                </AlertDialogCancel>
              </div>
              <AlertDialogDescription className="align-start">
                {modalDescription}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogCancel className="bg-tertiary-1000 hover:bg-tertiary-900 text-white hover:text-white p-[1.2rem] rounded-[12px]">
          Cancel
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InformationIcon;
