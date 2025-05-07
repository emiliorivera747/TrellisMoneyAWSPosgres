import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-4 py-5 mx-10 sm:px-4 sm:py-5">
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
