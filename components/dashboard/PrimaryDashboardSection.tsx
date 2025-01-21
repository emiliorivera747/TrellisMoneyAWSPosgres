import React from "react";

interface MainDashboardSectionProps {
  children: React.ReactNode;
}
const PrimaryDashboardSection = ({ children }: MainDashboardSectionProps) => {
  return (
    <section className="col-span-10 sm:col-span-7 overflow-y-auto h-screen no-scrollbar">
      {children}
    </section>
  );
};

export default PrimaryDashboardSection;
