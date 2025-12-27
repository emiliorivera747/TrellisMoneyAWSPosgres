import React from "react";
import GraphHeaders from "@/components/headers/GraphHeaders";
import MultipleValPriceChange from "@/components/dashboard/MultipleValPriceChange";
import { LinePayload } from "@/types/graphs";
import SelectYearMenuButton from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenuButton";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";
import RenderFilters from "@/features/projected-net-worth/components/projected-networth-graph/filters/RenderFilters";

import { useDashboardContext } from "@/context/dashboard/DashboardProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PrimaryGraphHeaderProps {
  linePayloads: LinePayload[];
  tooltipData: any;
  withInflationTag?: boolean;
  years: number[];
}

const PrimaryGraphHeader = ({
  linePayloads,
  tooltipData,
  withInflationTag,
  years,
}: PrimaryGraphHeaderProps) => {
  const {
    selectedYear,
    retirementYear,
    selectedFilter,
    handleFilterChange,
    handleYearSelection,
    editRetirementYear,
  } = useDashboardContext();
  return (
    <header className="flex flex-col w-full h-auto">
      <div className="flex flex-row text-[1.4rem] gap-2 w-full justify-between">
        <div className="flex flex-row gap-4">
          <GraphHeaders label="Future Projection" />
          <div className="flex items-center ">
            <SelectYearMenuButton
              selectedYear={selectedYear}
              years={years}
              retirementYear={retirementYear}
              setSelectedYear={handleYearSelection}
              editRetirementYear={editRetirementYear}
            />
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className=" text-tertiary-1000 border border-tertiary-300 text-xs flex flex-row justify-center gap-2 p-3 px-4 rounded-[12px] hover:bg-tertiary-200 items-center">
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
              <RenderFilters
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
              />
            </AlertDialogHeader>
            <AlertDialogFooter className="pt-6">
              <AlertDialogAction className="bg-tertiary-1000 py-6 rounded-[12px]">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex flex-row">
        <MultipleValPriceChange
          payloadForLines={linePayloads}
          tooltipData={tooltipData}
        />

        {withInflationTag && linePayloads.length === 1 && (
          <div className="text-[0.7rem] text-tertiary-1000 gap-1 w-[25%] flex items-start justify-end pt-5 bg-blue-300">
            <InflationTag linePayload={linePayloads[0]} />
            <div className="flex items-center gap-2  text-[0.7rem] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
              <span className="text-xs text-tertiary-800 font-light">
                With inflation
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PrimaryGraphHeader;
