import React from "react";
import Link from "next/link";

// Types
import { NetValueDisplayCardProps } from "@/types/dashboard";

// Helpers
import { convertToMoney } from "@/utils/helper-functions/convertToMoney";

/**
 * 
 * Displays the net value of the user's assets and liabilities.
 * 
 * @param param0 
 * @returns 
 */
const NetValueDisplay = ({
  title,
  linkLabel,
  linkUrl,
  primaryValue,
  secondaryValue,
  tertiaryValue,
  secondaryLabel,
  tertiaryLabel,
}: NetValueDisplayCardProps) => {
  return (
    <div className="border border-tertiary-200 flex flex-col items-start pt-6 pb-8 px-8 mt-6 gap-4 rounded-[12px]">
      <div className="flex flex-col justify-between  w-full">
        {" "}
        <h1 className="text-md justify-start text-tertiary-900">{title}</h1>
        <LinkWithIcon linkLabel={linkLabel} linkUrl={linkUrl} />
      </div>
      <p className="font-medium text-tertiary-900 text-2xl">{convertToMoney(primaryValue)}</p>
      <div className="flex gap-4">
        <Section
          amount={secondaryValue}
          color="#74c0fc"
          label={secondaryLabel}
        />
        <p className="flex items-center text-tertiary-800">-</p>
        <Section amount={tertiaryValue} color="#e03131" label={tertiaryLabel} />
      </div>
    </div>
  );
};
export default NetValueDisplay;



/**
 *  Displays a link with an icon.
 * 
 * @param param0 
 * @returns 
 */
const LinkWithIcon = ({
  linkLabel,
  linkUrl,
}: {
  linkLabel: string;
  linkUrl: string;
}) => {
  return (
    <Link
      href={linkUrl}
      className="text-tertiary-600 text-xs flex gap-1 items-center hover:underline"
    >
      {linkLabel}
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
  );
};


/**
 * Displays a section of the net value display.
 * 
 * @param param0 
 * @returns 
 */
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
      <h1 className="font-normal text-tertiary-800 text-[0.8rem] ">
        {convertToMoney(amount)}
      </h1>
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
