import React from "react";
import Link from "next/link";

interface SideNavItemLinkProps {
  href: string;
  svg_d: string;
  currentPath: string;
  label: string;
}
const getIcon = (path: string, strokeWidth: number) => (
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
    <CustomTooltip title={label}>
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
        {getIcon(svg_d, currentPath === href ? 1.8 : 1)}
        <span className="sm:hidden 2xl:inline text-[0.7rem] mt-1 2xl:w-3/4 ">
          {label}
        </span>
      </Link>
    </CustomTooltip>
  );
};
interface TooltipProps {
  title: string;
  children: React.ReactNode;
}
const CustomTooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <div className="relative group transition delay-300">
      {children}
      <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 mb-2 sm:hidden group-hover:block sm:bg-tertiary-800 text-white text-[0.6rem] rounded py-1 px-2 transition delay-300 2xl:bg-transparent bg-transparent ">
        {title}
      </div>
    </div>
  );
};

export default SideNavItemLink;
