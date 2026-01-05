import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Filter from "@/components/dashboard/Filter";
import { GraphFilterButtonWithModalProps } from "@/types/graphs";

const GraphFilterButtonWithModal = ({
  filterConfig,
  ref,
  className,
}: GraphFilterButtonWithModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className=" text-tertiary-1000 border border-tertiary-300 text-xs flex flex-row justify-center gap-2 p-3 px-4 rounded-[12px] hover:bg-tertiary-200 items-center h-[3rem] w-[6rem] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Filters
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-6 border-b border-tertiary-400 pb-4 flex justify-between items-center">
            Filters
            <AlertDialogCancel className="border-none shadow-none rounded-full p-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </AlertDialogCancel>
          </AlertDialogTitle>
          <Filter
            filterConfig={filterConfig}
            className={className}
            ref={ref}
          />
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-6">
          <AlertDialogAction className="bg-tertiary-1000 py-6 rounded-[12px]">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GraphFilterButtonWithModal;
