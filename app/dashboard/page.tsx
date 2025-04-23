"use client";

// React
import React from "react";

// Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import AssetsForm from "@/features/projected-financial-assets/components/AssetFrom";
import NetValueDisplay from "@/components/dashboard/NetValueDisplay";
import KeyStatContainer from "@/features/key-statistics/components/KeyStatContainer";
import Footer from "@/components/footers/Footer";
import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

// Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Context
import {
  useDashboardContext,
  DashboardProvider,
} from "@/context/dashboard/DashboardProvider";

/**
 *
 * Dashboard page is in charge of retrieving all of the financial data and displaying sending the
 * data to a variety of components.
 *
 *
 * @returns
 */
const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
