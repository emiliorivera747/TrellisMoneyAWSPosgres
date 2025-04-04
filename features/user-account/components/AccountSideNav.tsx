import React from "react";
import { accountSideNavConfig } from "@/features/user-account/config/accountSideNavConfig";
import Link from "next/link";
const AccountSideNav = () => {
  return (
    <aside className="w-[20rem] h-screen bg-yellow-300">
      <nav className=" mt-[20%] p-4 h-full bg-blue-200">
        <ul>
          {accountSideNavConfig.map(({ url, label }, i) => {
            return (
              <li key={i} className="w-full border p-2 text-sm">
                <Link href={url} className=" w-full box-border hover:underline">{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AccountSideNav;
