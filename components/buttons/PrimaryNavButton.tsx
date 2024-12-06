import React from "react";
import Link from "next/link";
interface PrimaryNavButtonProps {
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  withLinearGradient?: boolean;
  bgFrom?: string;
  bgTo?: string;
  hoverBgFrom?: string;
  hoverBgTo?: string;
  href: string;
  label: string;
}
const PrimaryNavButton = ({
  bgColor = "bg-blue-500",
  textColor = "text-white",
  hoverBgColor = "hover:bg-blue-700",
  text = "Submit",
  withLinearGradient = true,
  bgFrom = "from-primary-700",
  bgTo = "to-primary-800",
  hoverBgFrom = "hover:from-blue-700",
  hoverBgTo = "hover:to-blue-700",
  href,
  label,
}: PrimaryNavButtonProps) => {
  const buttonClass = withLinearGradient
    ? `flex items-center justify-center w-full bg-gradient-to-r ${bgFrom} ${bgTo} ${textColor} px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] ${hoverBgFrom} ${hoverBgTo} transition duration-300`
    : `flex items-center justify-center w-full ${bgColor} ${textColor} px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] ${hoverBgColor} transition duration-300`;
  return <Link href={href} className={buttonClass}>{label}</Link>;
};

export default PrimaryNavButton;
