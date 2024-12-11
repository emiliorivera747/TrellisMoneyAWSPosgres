"use client";
import { useState, useEffect } from "react";
import { mockProjectionData } from "@/utils/data/mockProjectionData";

import ParentSize from "@visx/responsive/lib/components/ParentSize";

//components
import LineGraph from "./LineGraph";


/**
 * Projects the future net worth of the user based on the data provided
 *
 */
const ProjectedNetWorthGraph = () => {
  const yearsIntoFuture = 40;
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(
    currentYear + yearsIntoFuture
  );

  const [filteredData, setFilteredData] = useState(mockProjectionData);

  useEffect(() => {
    const results = mockProjectionData.filter(
      (data) => new Date(data.date).getFullYear() <= selectedYear
    );
    console.log(results);
    setFilteredData([...results]);
  }, [selectedYear]);

  const years = Array.from({ length: 77 }, (_, i) => 2024 + i);

  const handleSelectedValue = (e: any) => {
    setSelectedYear(e.target.value);
  };
  //

  return (
    <div className="sm:mx-2 border-b border-zinc-200">
      <div className="flex flex-col gap-1">
        <div className="font-medium text-zinc-800 flex items-center gap-1 justify-start">
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
      <div className="h-[20rem] w-full">
        <ParentSize>
          {({ height , width }:{height: number, width: number}) => (
            <LineGraph 
              key={selectedYear}
              data={filteredData}
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
