"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

// Icons
import SideNavItemLink from "@/components/navigation/SideNavItemLink";
import { AiFillApple } from "react-icons/ai";

//Data
import { navigationItems } from "@/utils/data/navigation-bar-data/navigationItems";

const SideNavigationBar: React.FC = () => {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <aside className=" sm:border-tertiary-200 mt-4 sm:mt-10 flex  flex-col sm:flex-row justify-start w-full sm:justify-center sm:w-24 2xl:w-48 sm:h-auto sticky text-white sm:border-r border-tertiary-300 border-box ">
      <nav className=" flex flex-row sm:flex-col  pb-4 ">
        <ul className="flex flex-row sm:flex-col w-full sm:justify-normal sm:items-start items-center ">
          <li className="h-[3rem] w-[3rem] sm:mb-4 hover:bg-tertiary-300 rounded-[100%] flex items-center justify-center ">
            <div className="text-tertiary-900 font-bold text-3xl">T</div>
          </li>
          {navigationItems.map((item, index) => (
            <li
              key={item.label + index}
              className="flex items-center justify-center cursor-pointer sm:mb-4 w-full"
            >
              <SideNavItemLink
                href={item.link}
                currentPath={currentPath}
                svg_d={item.svg_d}
                label={item.label}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavigationBar;
