import React from "react";
import Link from "next/link";
import SignInButton from "@/features/auth/components/buttons/SignInButton";
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
interface NavbarProps {
  isAuthenticated?: boolean | null;
}

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-4 py-5 mx-10 sm:px-4 sm:py-5">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-tertiary-1000">
            Trellis Money
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
