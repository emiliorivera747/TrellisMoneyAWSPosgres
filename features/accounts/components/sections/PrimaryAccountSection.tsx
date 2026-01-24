import React from "react";

interface PrimaryAccountSectionProps {
  children: React.ReactNode;
}
const PrimaryAccountSection = ({ children }: PrimaryAccountSectionProps) => {
  return <section className="w-screen sm:w-[75%] mt-[3.2rem]">{children}</section>;
};

export default PrimaryAccountSection;
