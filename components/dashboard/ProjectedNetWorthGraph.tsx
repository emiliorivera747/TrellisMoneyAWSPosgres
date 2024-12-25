"use client";
import { useState, useEffect } from "react";
import { mockProjectionData } from "@/utils/data/mockProjectionData";

import ParentSize from "@visx/responsive/lib/components/ParentSize";

// Services
import financialProjectionService from "@/features/plaid/financial-projections/financialProjectionService";

//components
import LineGraph from "./LineGraph";

// Skeletons
import Skeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

// External Libraries
import { useQuery } from "@tanstack/react-query";
import { filter } from "@visx/vendor/d3-array";
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

  useEffect(() => {
    const filter = projectionData?.data?.filter((data: { year: number }) => {
      return data.year <= selectedYear;
    });
    const results = filter?.map((data: { year: number; close: number }) => {
      return {
        year: new Date(data.year,0, 1),
        close: data.close,
      };
    });
    setFilteredData(results);
  }, [selectedYear, projectionData]);

  const years = Array.from(
    { length: defaultYearsIntoTheFuture },
    (_, i) => 2024 + i
  );

  const handleSelectedValue = (e: any) => {
    setSelectedYear(e.target.value);
  };

  if (projectionLoading) return <ProjectedNetWorthGraphSkeleton />;

  return (
    <div className="sm:mx-2 border-b border-zinc-200">
      <div className="flex flex-col gap-1">
        <div className="font-medium text-tertiary-900 flex items-center gap-2 justify-start">
          <span className="text-xl tracking-wider">Projected Net Worth</span>
          <div className="">
            <select
              value={selectedYear}
              onChange={handleSelectedValue}
              className=" p-[0.2rem] border hover:border hover:border-zinc-200 border-white rounded font-normal text-zinc-800 self-end focus:outline-none"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="h-[25rem] w-full">
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
            />
          )}
        </ParentSize>
      </div>
    </div>
  );
};

export default ProjectedNetWorthGraph;
