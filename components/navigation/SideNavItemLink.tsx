import React from "react";
import Link from "next/link";
import { SideNavItemLinkProps } from "@/types/navigationbar";

// Components
import CustomTooltip from "@/components/tooltip/CustomTooltip";

const GetSvgWithPath = (path: string, strokeWidth: number) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    className="size-7 sm:inline hidden"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const SideNavItemLink: React.FC<SideNavItemLinkProps> = ({
  href,
  svg_d,
  currentPath,
  label,
}) => {
  return (
    <CustomTooltip label={label}>
      <Link
        href={href}
        className={`h-[3rem] rounded-[12px]  px-4 2xl:p-2 border-box 2xl:flex-row 2xl:w-28 2xl:justify-start 2xl:text-[3rem] items-center text-[2rem] sm:h-[3rem] sm:w-[3rem] 2xl:rounded-[12px] rounded:[12px] sm:rounded-[100%] flex flex-col text-center justify-center gap-2 hover:bg-tertiary-300 transition duration-500 ease-in-out  
        ${
          currentPath === href
            ? "text-tertiary-1000 font-bold"
            : "text-tertiary-800"
        }
        `}
      >
        {GetSvgWithPath(svg_d, currentPath === href ? 1.8 : 1)}
        <span className="sm:hidden 2xl:inline text-[0.7rem] mt-1 2xl:w-3/4 ">
          {label}
        </span>
      </Link>
    </CustomTooltip>
  );
};

export default SideNavItemLink;
