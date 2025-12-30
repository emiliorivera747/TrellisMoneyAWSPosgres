// Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import AssetsCard from "@/features/projected-financial-assets/components/AssetFrom";
import Footer from "@/components/footers/Footer";
import NetValueItems from "@/features/dashboard/components/NetValueItems";

// Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Context
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";

// Hooks
import { useFetchNetWorth } from "@/features/net-worth/hooks/useFetchNetWorth";
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";

/**
 * Displays all of the components in the dashboard
 * @returns JSX.Element
 */
export const DashboardContent = () => {
  const { form, onSubmit, selectedYear, selectedFilter } =
    useDashboardContext();

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
  } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });

  return (
    <div className="w-full box-border max-h-screen overflow-y-scroll flex flex-row gap-4">
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
      <div className="h-full w-[30%] sticky top-0 pt-[3%]">
        <AssetsCard form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
