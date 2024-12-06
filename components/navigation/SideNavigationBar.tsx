"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { PiTargetThin } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineStock } from "react-icons/ai";
import { CiCreditCard1 } from "react-icons/ci";

import PrimaryNavButton from "@/components/buttons/PrimaryNavButton";
import { AiFillBank } from "react-icons/ai";
import SideNavItemLink from "@/components/navigation/SideNavItemLink";
import { AiFillApple } from "react-icons/ai";

// Define the type for the state
interface ExpandedState {
  [key: string]: boolean;
}

const navigationItems = [
  {
    label: "Dashboard",
    link: "/dashboard",
    svg_d:
      "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
  },
  {
    label: "Investment Goals",
    link: "/investment-goals",
    svg_d:
      "M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0",
  },
  {
    label: "Accounts",
    link: "/accounts",
    svg_d:
      "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
  },
  {
    label: "Investments",
    link: "/investments",
    svg_d:"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
  },
];

const collapsedNavigationItems = [
  {
    label: "Credit Cards",
    nested_list_items: [
      { label: "Chase Credit Card", color: "red", amount: 99999 },
      { label: "Capital One Credit Card", color: "blue", amount: 90000 },
    ],
  },
  {
    label: "Depository",
    nested_list_items: [
      { label: "Regular Savings", color: "red", amount: 10000 },
      { label: "Total Checking", color: "green", amount: 10000 },
    ],
  },
  {
    label: "Investment",
    nested_list_items: [
      { label: "IRA", color: "red", amount: 10000 },
      { label: "401k", color: "green", amount: 9000 },
    ],
  },
  {
    label: "Loans",
    nested_list_items: [
      { label: "Auto Loan", color: "blue", amount: 10000 },
      { label: "Home Loan", color: "green", amount: 10000 },
    ],
  },
];

const SideNavigationBar: React.FC = () => {
  const formatAmount = (amount: Number) => {
    const value = Number(amount);
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}b`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}m`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}k`;

    return value.toString();
  };
  const pathname = usePathname();
  const currentPath = pathname;

  // Initialize the state with all items expanded
  const [expanded, setExpanded] = useState<ExpandedState>(
    Object.fromEntries(
      collapsedNavigationItems.map((item) => [item.label, true])
    )
  );

  const toggleExpand = (item: string) => {
    setExpanded((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <aside className="flex flex-row justify-center w-24 min-h-screen sticky text-white border-r border-tertiary-300">
      <div className="mt-8">
        <div className="h-[3rem] w-[3rem] mb-4 hover:bg-tertiary-300 rounded-[100%] flex items-center justify-center ">
          <AiFillApple className="text-tertiary-1000 text-4xl" />
        </div>

        <nav>
          <ul>
            {navigationItems.map((item) => (
              <li
                key={item.label}
                className="cursor-pointer mb-4"
                onClick={() => toggleExpand(item.label)}
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
      </div>
    </aside>
  );
};

export default SideNavigationBar;
