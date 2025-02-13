import React from "react";
import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";

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

export const ProjectedHoldingCardPrimaryHeader = ({
  year,
}: {
  year: number;
}) => {
  return (
    <div className="font-bold text-zinc-900 grid grid-cols-[3fr_2fr_1fr] gap-1 items-center">
      <span className="text-sm tracking-wider w-[2/4] pl-4">
        Financial Projections{" "}
      </span>{" "}
      <span className="font-normal ml-2 text-[0.9rem]">{year}</span>
      <span className="flex justify-end pr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="size-5 text-tertiary-700 hover:text-tertiary-1000"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </span>
    </div>
  );
};
