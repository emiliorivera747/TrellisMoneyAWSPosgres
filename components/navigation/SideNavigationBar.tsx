"use client";
import { usePathname } from "next/navigation";

import { CldImage } from "next-cloudinary";

// Icons
import SideNavItemLink from "@/components/navigation/SideNavItemLink";

//Data
import { navigationItems } from "@/utils/data/navigation-bar-data/navigationItems";

import UserProfileAvatarMenu from "@/features/user-account/components/UserProfileAvatarMenu";

import Link from "next/link";

import Image from "next/image";

const SideNavigationBar: React.FC = () => {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <aside className=" sm:border-tertiary-200 flex flex-col sm:flex-row justify-start w-full sm:justify-center sm:w-24 2xl:w-48  sticky text-white sm:border-r border-tertiary-300 border-box h-screen">
      <nav className=" flex flex-row sm:flex-col  pb-4 justify-between items-center my-[3.2rem]">
        <ul className="flex flex-row sm:flex-col w-full sm:justify-normal sm:items-start items-center">
          <li className="h-[3rem] w-[3rem] sm:mb-2 hover:bg-tertiary-300 rounded-[100%] flex items-center justify-center">
            <Link
              href="/dashboard"
              className="flex items-center justify-center h-full w-full"
            >
              <Image
                src="/Logo.svg"
                alt="logo"
                height={0}
                width={0}
                className="h-[2rem] w-[2rem]"
              />
            </Link>
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
        <UserProfileAvatarMenu />
      </nav>
    </aside>
  );
};

export default SideNavigationBar;
