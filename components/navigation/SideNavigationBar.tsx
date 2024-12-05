"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { PiTargetThin } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineStock } from "react-icons/ai";
import { CiCreditCard1 } from "react-icons/ci";

// Define the type for the state
interface ExpandedState {
  [key: string]: boolean;
}

const navigationItems = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    label: "Investment Goals",
    link: "/investment-goals",
    icon: <PiTargetThin />,
  },
  {
    label: "Accounts",
    link: "/accounts",
    icon: <CiCreditCard1 />,
  },
  {
    label: "Investments",
    link: "/investments",
    icon: <AiOutlineStock />,
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
  const formatAmount = (amount:Number) => {
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
    <aside className="w-72 min-h-screen h-auto text-white bg-white border-r border-tertiary-300">
      <div className="p-6">
        <Link
          href="/dashboard"
          className="text-zinc-800 font-bold  text-2xl  pb-4 block"
        >
          Trellis Money
        </Link>
        <nav>
          <ul>
            {navigationItems.map((item) => (
              <li
                key={item.label}
                className="cursor-pointer mb-2"
                onClick={() => toggleExpand(item.label)}
              >
                <Link
                  href={item.link}
                  className={`px-[.94118rem] py-[0.9rem] h-[2.2941176471rem] rounded flex flex-row items-center text-center gap-2 hover:bg-blue-100 hover:text-blue-900 transition duration-500 ease-in-out text-[0.9rem] font-medium ${
                    currentPath === item.link
                      ? "bg-primary-200 text-blue-900"
                      : "text-tertiary-900"
                  }`}
                >
                  <span className="">{item.icon}</span>
                  <span className=" flex items-center text-center">{item.label}</span>
                </Link>
              </li>
            ))}
            {/* <h1 className="text-[0.6rem] font-bold mt-8 uppercase mb-2 text-zinc-500">
              My Accounts
            </h1>
            {collapsedNavigationItems.map((item) => (
              <li key={item.label} className="text-zinc-600">
                <div
                  className="cursor-pointer flex flex-row rounded items-center gap-1"
                  onClick={() => toggleExpand(item.label)}
                >
                  <span className="text-[0.7rem] text-zinc-500 font-semibold">
                    {item.label}
                  </span>
                  {expanded[item.label] ? (
                    <IoMdArrowDropdown />
                  ) : (
                    <IoMdArrowDropup />
                  )}
                </div>
                <ul className="mb-2 text-[0.7rem] list-disc ml-4">
                  {expanded[item.label] &&
                    item.nested_list_items.map((nestedItem) => (
                      <li
                        key={nestedItem.label}
                        className=" text-zinc-700 flex items-center gap-2 text-md"
                      >
                        <GoDotFill style={{ color: nestedItem.color }} />
                        <span className="font-medium">
                          {nestedItem.label.length > 20
                            ? `${nestedItem.label.substring(0, 17)}...`
                            : nestedItem.label}
                        </span>
                        <span className="text-zinc-400 ">
                          $
                          {nestedItem.label.length > 8
                            ? `${formatAmount(nestedItem.amount).substring(
                                0,
                                7
                              )}...`
                            : formatAmount(nestedItem.amount)}
                        </span>
                      </li>
                    ))} */}
                {/* </ul>
              </li>
            ))} */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNavigationBar;
