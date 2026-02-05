"use client";

// React
import React from "react";

// Next
import Link from "next/link";

// Config
import { accountSideNavConfig } from "@/features/user-account/config/accountSideNavConfig";

// Hooks
import useFetchUser from "@/hooks/user/useFetchUser";

const AccountSideNav = () => {
  const { user } = useFetchUser();
  return (
    <aside className="w-[25rem]">
      <nav className="p-4">
        <h1 className="text-2xl font-bold text-tertiary-800 mb-4">
          {user?.email?.split("@")[0]}'s Account
        </h1>
        <ul className="">
          {accountSideNavConfig.map(({ url, label }, i) => {
            return (
              <li key={i} className="w-full  p-2 py-4 text-sm">
                <Link href={url} className=" w-full box-border hover:underline">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AccountSideNav;
