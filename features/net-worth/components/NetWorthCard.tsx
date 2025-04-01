import React from "react";
import Link from "next/link";

const NetWorthCard = ({}) => {
  return (
    <div className="border border-tertiary-200 flex flex-col items-start pt-6 pb-8 px-8 mt-6 gap-4 rounded-[12px]">
      <div className="flex flex-col justify-between  w-full">
        {" "}
        <h1 className="text-md justify-start text-tertiary-900">
          Money Left Over{" "}
        </h1>
        <Link href="/accounts" className="text-tertiary-600 text-xs flex gap-1 items-center hover:underline">
          Accounts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </Link>
      </div>

      <p className="font-medium text-tertiary-900 text-3xl">$10000</p>
      <div className="flex gap-4">
        <Section amount={1000} color="#74c0fc" label="Assets" />
        <p className="flex items-center text-tertiary-800">-</p>
        <Section amount={1000} color="#e03131" label="Liabilities" />
      </div>
    </div>
  );
};
export default NetWorthCard;

const Section = ({
  amount,
  color,
  label,
}: {
  amount: number;
  color: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-start text-xs">
      <h1 className="font-normal text-tertiary-800 text-[0.8rem] ">${amount}</h1>
      <div className="flex items-center gap-1">
        <span
          className={`w-2 h-2 rounded-full`}
          style={{ backgroundColor: color }}
        ></span>
        <p className="text-tertiary-600 text-[0.7rem]">{label}</p>
      </div>
    </div>
  );
};
