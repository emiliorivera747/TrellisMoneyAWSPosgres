"use client";

// Components
import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

// Context
import { AssetsDashboardProvider } from "@/context/dashboard/AssetsDashboardProvider";

/**
 *
 * Dashboard page is in charge of retrieving all of the financial data and displaying the
 * data to a variety of components.
 *
 * @returns
 */
const Dashboard = () => {
  return (
    <AssetsDashboardProvider>
      <DashboardContent />
    </AssetsDashboardProvider>
  );
};

export default Dashboard;
