import React from "react";

export const ProjectedHoldingCardHeader = () => {
  return (
    <thead className="border-y border-[#e9ecef] bg-yellow-400">
      <tr>
        <th
          scope="col"
          className="px-4 py-3 text-left text-xs font-medium text-[#343a40] tracking-wider"
        >
          Assets
        </th>
        <th
          scope="col"
          className="px-4 py-3 text-left text-xs font-medium text-[#343a40] tracking-wider"
        >
          Annual growth rate
        </th>
        <th
          scope="col"
          className="px-4 py-3 text-left bg-yellow-100 text-xs font-medium text-[#343a40] tracking-wider"
        >
          Projection
        </th>
      </tr>
    </thead>
  );
};

export const ProjectedHoldingCardPrimaryHeader = ({ year }: { year: number }) => {
  return (
    <div className="font-bold text-zinc-800 flex items-center gap-1 justify-start p-4">
      <span className="text-sm tracking-wider">Financial Projections </span> <span className="font-normal ml-2 text-[0.9rem]">{year}</span>
    </div>
  );
};
