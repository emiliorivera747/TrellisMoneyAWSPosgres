import React from "react";

const ProjectedNetWorthGraphSkeleton = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <div className="font-medium text-tertiary-900 flex items-center gap-2 justify-start">
          <h1 className="text-[1.4rem] tracking-wider font-medium">
            Projection
          </h1>
          <div className="bg-tertiary-200 rounded h-8 w-24 animate-pulse p-[0.2rem]"></div>
        </div>
      </div>
      <div className="h-[24rem] w-full bg-tertiary-300 rounded animate-pulse"></div>
      <div className="gap-2 mt-4 grid grid-cols-6 items-center border-b border-tertiary-300 pb-6 h-[6rem]">
        <div className="h-10 bg-tertiary-200 rounded-full animate-pulse col-span-2"></div>
        <div className="h-10 bg-tertiary-200 rounded-full animate-pulse col-span-2"></div>
        <div className="h-10 bg-tertiary-200 rounded-full animate-pulse col-span-2"></div>
      </div>
    </div>
  );
};

export default ProjectedNetWorthGraphSkeleton;
