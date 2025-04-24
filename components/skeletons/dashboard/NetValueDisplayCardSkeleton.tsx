import React from "react";

const NetValueDisplaySkeleton = () => {
  return (
    <div className="border border-tertiary-400 flex flex-col items-start pt-6 pb-8 px-8 mt-6 gap-3 rounded-[12px] animate-pulse">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <div className="h-5 w-32 bg-tertiary-200 rounded"></div>
          <div className="h-4 w-4 bg-tertiary-200 rounded-full"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-16 bg-tertiary-200 rounded"></div>
          <div className="h-3 w-3 bg-tertiary-200 rounded"></div>
        </div>
      </div>
      <div className="h-8 w-28 bg-tertiary-200 rounded"></div>
      <div className="flex gap-4">
        <div className="flex flex-col items-start gap-1">
          <div className="h-4 w-20 bg-tertiary-200 rounded"></div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-tertiary-200 rounded-full"></div>
            <div className="h-3 w-16 bg-tertiary-200 rounded"></div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-tertiary-200 rounded"></div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="h-4 w-20 bg-tertiary-200 rounded"></div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-tertiary-200 rounded-full"></div>
            <div className="h-3 w-16 bg-tertiary-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetValueDisplaySkeleton;
