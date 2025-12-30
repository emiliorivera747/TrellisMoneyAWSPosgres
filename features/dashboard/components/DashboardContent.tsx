// Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import AssetsCard from "@/features/projected-financial-assets/components/AssetFrom";
import NetValueDisplay from "@/components/dashboard/NetValueDisplay";
import Footer from "@/components/footers/Footer";
import NetValueItems from "@/features/dashboard/components/NetValueItems";

import { NET_VALUE_ITEMS } from "@/features/dashboard/config/netValueItems";

// Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Context
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";

/**
 * Displays all of the components in the dashboard
 * @returns JSX.Element
 */
export const DashboardContent = () => {
  const { netWorthData, netWorthLoading, form, onSubmit } =
    useDashboardContext();

  return (
    <div className="w-full box-border max-h-screen overflow-y-scroll flex flex-row gap-4">
      <div className="p-4 w-[70%] mt-[2%] max-h-screen">
        <PrimaryDashboardSection>
          <ProjectedNetWorthGraph />
          <NetValueItems
            netWorthLoading={netWorthLoading}
            netWorthData={netWorthData}
          />
          <Footer />
        </PrimaryDashboardSection>
      </div>
      <div className="h-full w-[30%] sticky top-0 pt-[3%]">
        <AssetsCard form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
