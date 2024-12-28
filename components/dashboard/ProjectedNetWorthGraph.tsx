"use client";
import { useState, useEffect } from "react";
import { mockProjectionData } from "@/utils/data/mockProjectionData";

import ParentSize from "@visx/responsive/lib/components/ParentSize";

// Services
import financialProjectionService from "@/features/plaid/financial-projections/financialProjectionService";

//components
import LineGraph from "./LineGraph";
import LineGraphFilterButton from "@/components/buttons/LineGraphFilterButton";

// Skeletons
import Skeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

// External Libraries
import { useQuery } from "@tanstack/react-query";
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";


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
  const [filteredData, setFilteredData] = useState(projectionData?.data);

  const [isInflation, setIsInflation] = useState(false);
  const [isNoInflation, setIsNoInflation] = useState(true);
  const [isBoth, setIsBoth] = useState(false);

  useEffect(() => {
    const filter = projectionData?.data?.filter((data: { year: number }) => {
      return data.year <= selectedYear;
    });
    const results = filter?.map((data: { year: number; close: number }) => {
      return {
        year: new Date(data.year, 0, 1),
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

  const handleSelectedValue = (e: any) => {
    setSelectedYear(e.target.value);
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
            <select
              value={selectedYear}
              onChange={handleSelectedValue}
              className=" p-[0.2rem] border hover:border hover:border-tertiary-300 border-white rounded font-normal text-zinc-800 text-xl self-end focus:outline-none"
            >
            {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))} */}
        
           </select>
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
