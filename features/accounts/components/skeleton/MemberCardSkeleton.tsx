import React from "react";

const MemberCardSkeleton = ({ length}: { length: number }) => {
  return (
    <div className="">
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row gap-4 items-center border rounded-[12px] px-4 py-[1rem] animate-pulse my-2"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberCardSkeleton;
