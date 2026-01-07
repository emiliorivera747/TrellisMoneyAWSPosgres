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
import AddConnectionButton from "@/features/manage-connections/components/AddConnectionButton";

// Hooks
import useSubscription from "@/hooks/react-query/subscription/useSubscription";

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
  const {
    subscriptionResponse,
    subscriptionError,
    subscriptionHasError,
    isLoadingSubscription,
  } = useSubscription();

  return (
    <aside className=" sm:border-tertiary-200 flex flex-col sm:flex-row justify-start w-full sm:justify-center sm:w-24 2xl:w-48 min-w-24 sticky text-white sm:border-r border-tertiary-300 border-box h-screen">
      <nav className=" flex flex-row sm:flex-col  pb-4 justify-between items-center my-[3.2rem]">
        <ul className="flex flex-row sm:flex-col w-full sm:justify-normal sm:items-start items-center">
          <li className="h-[3rem] w-[3rem] sm:mb-2 hover:bg-tertiary-300 rounded-[100%] flex items-center justify-center">
            {subscriptionResponse?.subscribed ? (
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
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <Image
                  src="/Logo.svg"
                  alt="logo"
                  height={0}
                  width={0}
                  className="h-[2rem] w-[2rem] opacity-50"
                />
              </div>
            )}
          </li>
          {navigationItems.map((item, index) => (
            <li
              key={item.label + index}
              className={`flex items-center justify-center cursor-pointer sm:mb-4 w-full`}
            >
              <SideNavItemLink
                href={item.link}
                currentPath={currentPath}
                svg_d={item.svg_d}
                label={item.label}
                isSubscribed={subscriptionResponse?.subscribed ?? false}
              />
            </li>
          ))}
          <li className="flex items-center justify-center cursor-pointer sm:mb-4 w-full">
            {subscriptionResponse?.subscribed && <AddConnectionButton />}
          </li>
        </ul>
        {
          <UserProfileAvatarMenu
            isSubscribed={subscriptionResponse?.subscribed ?? false}
          />
        }
      </nav>
    </aside>
  );
};

export default SideNavigationBar;
