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
      <div className="flex flex-row text-[1.4rem] gap-2">
        <GraphHeaders label="Projected Net Worth" />
        <SelectYearMenuButton
          selectedYear={selectedYear}
          years={years}
          retirementYear={retirementYear}
          setSelectedYear={setSelectedYear}
          editRetirementYear={editRetirementYear}
        />
      </div>

      <div className="flex flex-row">
        <MultipleValPriceChange
          dataForLines={dataForLines}
          tooltipData={tooltipData}
        />
        {withInflationTag && dataForLines.length === 1 && (
          <div className="pt-2 text-[0.7rem] text-tertiary-1000 gap-1 w-[25%] flex items-start justify-center">
            <InflationTag dataForLine={dataForLines[0]} />
          </div>
        )}
      </div>
    </header>
  );
};

export default PrimaryGraphHeader;
