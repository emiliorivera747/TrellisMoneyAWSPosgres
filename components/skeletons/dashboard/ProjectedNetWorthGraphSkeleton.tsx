import React from "react";

const ProjectedNetWorthGraphSkeleton = () => {
  return (
    <div className="sm:mx-2 border-b border-zinc-200 animate-pulse">
      <div className="flex flex-col pb-2">
        <div className="font-medium text-tertiary-900  flex items-center gap-1 justify-start">
        <span className="text-xl tracking-wider">Projected Net Worth</span>
          <div className="bg-primary-100 rounded h-6 w-24"></div>
        </div>
      </div>
      <div className="h-[20rem] w-full bg-primary-100 rounded"></div>
    </div>
  );
};

export default ProjectedNetWorthGraphSkeleton;
