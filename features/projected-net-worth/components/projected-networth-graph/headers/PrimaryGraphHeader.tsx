import React from "react";
import GraphHeaders from "@/components/headers/GraphHeaders";
import MultipleValPriceChange from "@/components/dashboard/MultipleValPriceChange";
import { LinePayload } from "@/types/graphs";
import SelectYearMenuButton from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenuButton";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";

interface PrimaryGraphHeaderProps {
  dataForLines: LinePayload[];
  tooltipData: any;
  withInflationTag: boolean;
  years: number[];
  selectedYear: number;
  retirementYear: number;
  setSelectedYear: (year: number) => void;
  editRetirementYear: (year: number) => void;
}



const PrimaryGraphHeader = ({
  dataForLines,
  tooltipData,
  withInflationTag,
  years,
  selectedYear,
  retirementYear,
  setSelectedYear,
  editRetirementYear,
}: PrimaryGraphHeaderProps) => {
  return (
    <header className="flex flex-col w-full h-auto">
      <div className="flex flex-row text-[1.4rem] gap-2 w-full justify-between">
        <div className="flex flex-row">
          <GraphHeaders label="Future Projection" />
          <SelectYearMenuButton
            selectedYear={selectedYear}
            years={years}
            retirementYear={retirementYear}
            setSelectedYear={setSelectedYear}
            editRetirementYear={editRetirementYear}
          />
        </div>
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
      </div>

      <div className="flex flex-row">
        <MultipleValPriceChange
          dataForLines={dataForLines}
          tooltipData={tooltipData}
        />
        {withInflationTag && dataForLines.length === 1 && (
          <div className="pt-2 text-[0.7rem] text-tertiary-1000 gap-1 w-[25%] flex items-start justify-end ">
            <InflationTag dataForLine={dataForLines[0]} />
          </div>
        )}
      </div>
    </header>
  );
};

export default PrimaryGraphHeader;
