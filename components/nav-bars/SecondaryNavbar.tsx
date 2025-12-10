import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * NavBar Component
 *
 * This component renders a secondary navigation bar with a logo and a title.
 * It is styled using Tailwind CSS classes and is designed to be responsive.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation bar component.
 *
 * @example
 * <NavBar />
 *
 * @remarks
 * - The navigation bar includes a logo image and a title "Trellis Money".
 * - The `Link` component is used for navigation, pointing to the root path ("/").
 * - The `Image` component is used to display the logo with specific dimensions.
 * - Tailwind CSS classes are used for styling, ensuring responsiveness and proper alignment.
 */
const NavBar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 py-5 mx-10 sm:px-4 sm:py-5">
      <div className="flex items-center">
      <Link href="/" className="flex items-end">
          <span className="text-xl font-bold text-tertiary-1000  flex items-end">
            <Image
              src="/Logo.svg"
              alt="logo"
              height={0}
              width={0}
              className="h-[1.8rem] w-[1.8rem]"
            />
            rellis Money
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
