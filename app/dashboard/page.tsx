"use client";

// React
import React from "react";

// Components
import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

// Context
import { DashboardProvider } from "@/context/dashboard/DashboardProvider";

/**
 *
 * Dashboard page is in charge of retrieving all of the financial data and displaying the
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
