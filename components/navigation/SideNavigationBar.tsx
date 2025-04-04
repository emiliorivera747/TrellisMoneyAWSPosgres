"use client";
import { usePathname } from "next/navigation";

// Icons
import SideNavItemLink from "@/components/navigation/SideNavItemLink";

//Data
import { navigationItems } from "@/utils/data/navigation-bar-data/navigationItems";


import UserProfileAvatarMenu from "@/features/user-profile/components/UserProfileAvatarMenu";


const SideNavigationBar: React.FC = () => {

  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <aside className=" sm:border-tertiary-200 flex flex-col sm:flex-row justify-start w-full sm:justify-center sm:w-24 2xl:w-48  sticky text-white sm:border-r border-tertiary-300 border-box h-screen">
      <nav className=" flex flex-row sm:flex-col  pb-4 justify-between items-center my-10">
        <ul className="flex flex-row sm:flex-col w-full sm:justify-normal sm:items-start items-center">
          <li className="h-[3rem] w-[3rem] sm:mb-4 hover:bg-tertiary-300 rounded-[100%] flex items-center justify-center">
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
        <UserProfileAvatarMenu />
      </nav>
    </aside>
  );
};

export default SideNavigationBar;
