"use client";
import { useState, useEffect } from "react";

import ParentSize from "@visx/responsive/lib/components/ParentSize";

// Services
import financialProjectionService from "@/features/plaid/financial-projections/financialProjectionService";

//components
import LineGraph from "./LineGraph";
import LineGraphFilterButton from "@/components/buttons/LineGraphFilterButton";
import SelectYearMenu from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenu";

//Functions
import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";

// External Libraries
import { useQuery } from "@tanstack/react-query";
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

// UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//React hook forms
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  RetirementYearInput,
  retirementYearInputSchema,
} from "@/features/projected-net-worth/schema/ProjectedNetWorthGraphSchemas";

/**
 * Projects the future net worth of the user based on the data provided
 *
 */
const ProjectedNetWorthGraph = () => {

  const defaultYearsIntoTheFuture = 100;

  const currentYear = Number(new Date().getFullYear().toString());

  const [selectedYear, setSelectedYear] = useState(
    currentYear + defaultYearsIntoTheFuture
  );

  const {
    data: projectionData,
    error: projectionError,
    isLoading: projectionLoading,
  } = useQuery({
    queryKey: ["projectedNetWorth", currentYear, selectedYear],
    queryFn: ({ queryKey }) => {
      const [, startDate, endDate] = queryKey;
      return financialProjectionService.generateProjectedNetWorth(
        Number(startDate),
        Number(endDate)
      );
    },
  });


  const [retirementYear, setRetirementYear] = useState(2050);
  const [filteredData, setFilteredData] = useState(projectionData?.data);
  const [isInflation, setIsInflation] = useState(false);
  const [isNoInflation, setIsNoInflation] = useState(true);
  const [isBoth, setIsBoth] = useState(false);

  useEffect(() => {

    const filter = projectionData?.data?.filter((data: { date: Date }) => {
      return new Date(data.date).getFullYear() <= selectedYear;
    });

    const results = filter?.map((data: { date: Date; close: number }) => {
      return {
        date: new Date(data.date),
        close: data.close,
      };
    });
    setFilteredData(results);
  }, [selectedYear, projectionData]);

  const handleIsInflation = () => {
    setIsInflation(true);
    setIsNoInflation(false);
    setIsBoth(false);
  };

  const handleIsNoInflation = () => {
    setIsInflation(false);
    setIsNoInflation(true);
    setIsBoth(false);
  };

  const handleIsBoth = () => {
    setIsInflation(false);
    setIsNoInflation(false);
    setIsBoth(true);
  };

  const years = Array.from(
    { length: defaultYearsIntoTheFuture + 1 },
    (_, i) => 2024 + i
  );

  const editRetirementYear = (year: number) => {
    setRetirementYear(year);
    setSelectedYear(year);
  };

  if (projectionLoading) return <ProjectedNetWorthGraphSkeleton />;

  return (
    <div className="sm:mx-2 mb-8">
      <div className="flex flex-col gap-1">
        <div className="font-medium text-tertiary-900 flex items-center gap-2 justify-start">
          <h1 className="text-[1.4rem] tracking-wider font-medium">
            Projected Net Worth
          </h1>
          <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none flex items-center justify-center gap-2 transition duration-500 ease-in-out border border-transparent border-tertiary-500 rounded-[6px] p-1 font-normal px-2 text-[1.2rem] hover:bg-tertiary-100 hover:border-tertiary-900">
                {selectedYear}
                {GetSvgV2({
                  path: "m19.5 8.25-7.5 7.5-7.5-7.5",
                  strokeWidth: 1.5,
                  size: "size-4",
                })}
                </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="backdrop-blur bg-tertiary-300/40"
              >
                <SelectYearMenu
                  years={years}
                  retirementYear={retirementYear}
                  setSelectedYear={setSelectedYear}
                  setRetirementYear={editRetirementYear}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="h-[24rem] w-full border-box">
        <ParentSize>
          {({ height, width }: { height: number; width: number }) => (
            <LineGraph
              key={selectedYear}
              data={
                filteredData?.length > 0
                  ? filteredData
                  : [{ date: 2024, netWorth: 0 }]
              }
              selectedYear={selectedYear}
              width={width}
              height={height}
              margin={{ top: 6, right: 6, bottom: 10, left: 6 }}
            />
          )}
        </ParentSize>
      </div>
      <div className=" gap-2 mt-4 grid grid-cols-6 items-center border-b border-tertiary-300 pb-6 ">
        <LineGraphFilterButton
          isSelected={isNoInflation}
          svg_path="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          label="No Inflation"
          onClick={handleIsNoInflation}
        />
        <LineGraphFilterButton
          isSelected={isInflation}
          svg_path="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          label="With Inflation"
          onClick={handleIsInflation}
        />
        <LineGraphFilterButton
          isSelected={isBoth}
          svg_path="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          label="Both"
          onClick={handleIsBoth}
        />
      </div>
    </div>
  );
};

export default ProjectedNetWorthGraph;
