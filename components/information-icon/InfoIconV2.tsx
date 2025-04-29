import React from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ModalData {
  header: string;
  description: string;
}

interface InformationIconProps {
  size?: string;
  color?: string;
  strokeWidth?: number;
  ref: React.Ref<SVGSVGElement>;
  modalTitle?: string;
  modalData?: ModalData[];
  modalDescriptionT?: string;
  modalDescriptionB?: string;
  className?: string;
}

const InformationIcon = ({
  size = "size-6",
  color = "text-tertiary-800",
  strokeWidth = 1.5,
  className,
  ref,
  modalTitle = "Are you sure?",
  modalDescriptionT,
  modalDescriptionB,
  modalData,
}: InformationIconProps) => {
  const defaultClass = `${size} ${color} hover:bg-tertiary-200 rounded p-1`;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth}
          ref={ref}
          stroke="currentColor"
          className={cn(defaultClass, className)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center w-full ">
            <div className="w-full">
              <div className="flex flex-row justify-between pb-2 w-full items-center">
                <AlertDialogTitle className="text-xl text-tertiary-1000">
                  {modalTitle}
                </AlertDialogTitle>
                <AlertDialogCancel className="shadow-none" asChild>
                  <button
                    aria-label="Close"
                    className="rounded-full text-gray-500 hover:text-gray-700 border-none outline-none cursor-pointer p-2 transition-colors duration-200 ease-in-out"
                  >
                    ✕
                  </button>
                </AlertDialogCancel>
              </div>
              <AlertDialogDescription className="align-start pb-4">
                {modalDescriptionT}
              </AlertDialogDescription>
              {modalData?.map((data: ModalData, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <AlertDialogHeader className="font-bold text-sm">
                      {data.header}
                    </AlertDialogHeader>
                    <AlertDialogDescription className="pb-4 text-sm">
                      {data.description}
                    </AlertDialogDescription>
                  </React.Fragment>
                );
              })}
              {modalDescriptionB && (
                <AlertDialogDescription className="align-start pb-4">
                  {modalDescriptionB}
                </AlertDialogDescription>
              )}
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
