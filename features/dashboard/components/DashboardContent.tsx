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

// Constants
const NET_VALUE_ITEMS = [
  {
    title: "Net worth",
    linkLabel: "Accounts",
    linkUrl: "/accounts",
    values: (netWorthData: any) => ({
      primary: netWorthData?.data?.netWorth ?? 0,
      secondary: netWorthData?.data?.assets ?? 0,
      tertiary: netWorthData?.data?.liabilities ?? 0,
    }),
    labels: {
      secondary: "Assets",
      tertiary: "Liabilities",
    },
    modal: {
      title: "Net worth",
      description:
        "Net worth reflects your financial position. A positive value means your assets exceed debts, while a negative value indicates more debt than assets.",
    },
  },
  {
    title: "Cash Flow",
    linkLabel: "Accounts",
    linkUrl: "/accounts",
    values: () => ({
      primary: 10000,
      secondary: 20000,
      tertiary: 10000,
    }),
    labels: {
      secondary: "All income",
      tertiary: "All spending",
    },
    modal: {
      title: "Cash flow",
      description:
        "Cash flow shows how money moves in and out. A positive value means you’re earning more than you spend, while a negative value suggests you’re spending beyond your income.",
    },
  },
];

/**
 * Displays all of the components in the dashboard
 * @returns JSX.Element
 */
export const DashboardContent = () => {
  const { netWorthData, form, onSubmit } = useDashboardContext();

  return (
    <div className="w-full box-border max-h-screen overflow-y-scroll flex flex-row gap-4">
      <div className="p-4 w-[70%] mt-[2%] max-h-screen">
        <PrimaryDashboardSection>
          <ProjectedNetWorthGraph />
          <div className="grid grid-cols-2 gap-6 border-b pb-8 border-tertiary-300">
            {NET_VALUE_ITEMS.map((item, index) => (
              <NetValueDisplay
                key={index}
                title={item.title}
                linkLabel={item.linkLabel}
                linkUrl={item.linkUrl}
                primaryValue={item.values(netWorthData).primary}
                secondaryValue={item.values(netWorthData).secondary}
                tertiaryValue={item.values(netWorthData).tertiary}
                secondaryLabel={item.labels.secondary}
                tertiaryLabel={item.labels.tertiary}
                modalTitle={item.modal.title}
                modalDescription={item.modal.description}
              />
            ))}
          </div>
          <Footer />
        </PrimaryDashboardSection>
      </div>
      <div className="h-full w-[30%] sticky top-0 pt-[3%]">
        <AssetsForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
