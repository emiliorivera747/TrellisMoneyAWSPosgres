"use client";

// Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import AssetsCard from "@/features/projected-financial-assets/components/assets-card/assets-form/AssetsForm";
import Footer from "@/components/footers/Footer";
import NetValueItems from "@/features/dashboard/components/NetValueItems";
import { AssetsDashboardProvider } from "@/context/dashboard/AssetsDashboardProvider";

// Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Hooks
import { useFetchNetWorth } from "@/features/net-worth/hooks/useFetchNetWorth";
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";

// Selectors
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";

/**
 * Displays all of the components in the dashboard
 * @returns JSX.Element
 */
const DashboardContent = () => {
  const { selectedInflationFilter } = useDashboardFilters();

  /**
   * Both Request will be made in parallel
   */
  const { netWorthData, netWorthHasError, netWorthLoading, netWorthError } =
    useFetchNetWorth();

  const {
    futureProjectionData,
    futureProjectionError,
    futureProjectionLoading,
    futureProjectionHasError,
  } = useFetchProjections();

  return (
    <div className="w-full box-border max-h-screen overflow-y-scroll flex flex-row gap-4">
      {/* Primary Dashboard Seciton */}
      <div className="p-4 w-[70%] mt-[2%] max-h-screen">
        <PrimaryDashboardSection>
          <ProjectedNetWorthGraph
            futureProjectionData={futureProjectionData}
            futureProjectionHasError={futureProjectionHasError}
            futureProjectionLoading={futureProjectionLoading}
            futureProjectionError={futureProjectionError}
          />
          <NetValueItems
            netWorthLoading={netWorthLoading}
            netWorthData={netWorthData}
            netWorthHasError={netWorthHasError}
            netWorthError={netWorthError}
          />
          <Footer />
        </PrimaryDashboardSection>
      </div>

      {/* Secondary Dashboard Section */}
      <div className="h-full w-[30%] sticky top-0 pt-[3%]">
        <AssetsDashboardProvider>
          <AssetsCard
            selectedInflationFilter={selectedInflationFilter}
            futureProjectionData={futureProjectionData}
          />
        </AssetsDashboardProvider>
      </div>
    </div>
  );
};

export default DashboardContent;
