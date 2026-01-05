"use client";
import { usePathname } from "next/navigation";

// Icons
import SideNavItemLink from "@/components/navigation/SideNavItemLink";

//Data
import { navigationItems } from "@/utils/mock/data/navigation-bar-data/navigationItems";

import UserProfileAvatarMenu from "@/features/user-account/components/UserProfileAvatarMenu";
import Link from "next/link";
import Image from "next/image";

// Components
import AddConnection from "@/features/accounts/components/AddConnection";

/**
 * SideNavigationBar component renders a responsive side navigation bar
 * with navigation items and a user profile menu.
 *
 * @component
 * @returns {JSX.Element} The rendered side navigation bar component.
 *
 * @remarks
 * - Utilizes `usePathname` to determine the current path for highlighting active links.
 * - Displays a logo at the top and dynamically renders navigation items.
 * - Includes a user profile avatar menu at the bottom.
 *
 * @dependencies
 * - `Link` from `next/link` for navigation.
 * - `Image` from `next/image` for rendering the logo.
 * - `SideNavItemLink` for individual navigation items.
 * - `UserProfileAvatarMenu` for the user profile menu.
 *
 * @example
 * ```tsx
 * <SideNavigationBar />
 * ```
 */
const SideNavigationBar: React.FC = () => {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <aside className=" sm:border-tertiary-200 flex flex-col sm:flex-row justify-start w-full sm:justify-center sm:w-24 2xl:w-48 min-w-24 sticky text-white sm:border-r border-tertiary-300 border-box h-screen">
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
          <li className="flex items-center justify-center cursor-pointer sm:mb-4 w-full">
            <span
              className={` border border-tertiary-300  h-[3rem] rounded-[12px]  px-4 2xl:p-2 border-box 2xl:flex-row 2xl:w-28 2xl:justify-start 2xl:text-[3rem] items-center text-[2rem] sm:h-[3rem] sm:w-[3rem] 2xl:rounded-[12px] rounded:[12px] sm:rounded-[100%] flex flex-col text-center justify-center gap-2 hover:bg-tertiary-300 transition duration-500 ease-in-out  

        `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-tertiary-1000"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
          </li>
        </ul>
        <UserProfileAvatarMenu />
      </nav>
    </aside>
  );
};

export default SideNavigationBar;
