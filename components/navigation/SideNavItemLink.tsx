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
    className="size-7"
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
        className={`border-box text-[2rem] h-[3rem] w-[3rem] rounded-[100%] flex flex-col items-center text-center justify-center gap-1 hover:bg-tertiary-300 transition duration-500 ease-in-out  
        ${
          currentPath === href
            ? "text-tertiary-1000 font-bold"
            : "text-tertiary-800"
        }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={currentPath === href ? 1.8 : 1}
          stroke="currentColor"
          className="size-7"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={svg_d} />
        </svg>
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
    <div className="relative group transition delay-300 ">
      {children}
      <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-tertiary-800 text-white text-[0.6rem] rounded py-1 px-2 transition delay-300">
        {title}
      </div>
    </div>
  );
};

export default SideNavItemLink;
