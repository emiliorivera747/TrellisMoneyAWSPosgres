// React
import React from "react";

// Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import AssetsForm from "@/features/projected-financial-assets/components/AssetFrom";
import NetValueDisplay from "@/components/dashboard/NetValueDisplay";
import Footer from "@/components/footers/Footer";

// Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Context
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";


export const DashboardContent = () => {
  const { netWorthData, form, onSubmit } = useDashboardContext();

  return (
    <div className="w-full box-border max-h-screen overflow-y-scroll flex flex-row gap-4">
      <div className="p-4 w-[70%] mt-[2%] max-h-screen">
        <PrimaryDashboardSection>
          <ProjectedNetWorthGraph />
          <div className="grid grid-cols-2 gap-6 border-b pb-8 border-tertiary-300">
            <NetValueDisplay
              title="Net worth"
              linkLabel="Accounts"
              linkUrl="/accounts"
              primaryValue={netWorthData?.data?.netWorth ?? 0}
              secondaryValue={netWorthData?.data?.assets ?? 0}
              tertiaryValue={netWorthData?.data?.liabilities ?? 0}
              secondaryLabel="Assets"
              tertiaryLabel="Liabilities"
              modalTitle="Net worth"
              modalDescription="Net worth reflects your financial position. A positive value means your assets exceed debts, while a negative value indicates more debt than assets."
            />
            <NetValueDisplay
              title="Cash Flow"
              linkLabel="Accounts"
              linkUrl="/accounts"
              primaryValue={10000}
              secondaryValue={20000}
              tertiaryValue={10000}
              secondaryLabel="All income"
              tertiaryLabel="All spending"
              modalTitle="Cash flow"
              modalDescription="Cash flow shows how money moves in and out. A positive value means you’re earning more than you spend, while a negative value suggests you’re spending beyond your income."
            />
          </div>
          {/* <KeyStatContainer/> */}
          <Footer />
        </PrimaryDashboardSection>
      </div>
      <div className="h-full w-[30%] sticky top-0 pt-[3%]">
        <AssetsForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
