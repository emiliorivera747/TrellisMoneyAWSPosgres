import React from "react";

export const ProjectedHoldingCardHeader = () => {
  return (
    <thead className="border-y border-[#e9ecef]">
      <tr>
        <th
          scope="col"
          className="px-4 py-3 text-left text-xs font-medium text-[#343a40] tracking-wider"
        >
          Holding
        </th>
        <th
          scope="col"
          className="px-4 py-3 text-left text-xs font-medium text-[#343a40] tracking-wider"
        >
          Annual growth rate
        </th>
        <th
          scope="col"
          className="px-4 py-3 text-left text-xs font-medium text-[#343a40] tracking-wider"
        >
          Proj
        </th>
      </tr>
    </thead>
  );
};

export const ProjectedHoldingCardPrimaryHeader = () => {
  return (
    <div className="font-bold text-zinc-800 flex items-center gap-1 justify-start p-4">
      <span className="text-sm tracking-wider">Projected Holdings</span>
    </div>
  );
};
