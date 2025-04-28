import React, { createContext, ReactNode, useContext } from "react";
import {  DashboardState } from "@/types/dashboard";

// Hooks
import { useDashboard } from "@/hooks/dashboard/useDashboard";

/**
 * Dashboard  context
 */
const DashboardContext = createContext<DashboardState | null>(null);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dashboardState = useDashboard();

  return (
    <DashboardContext.Provider value={dashboardState}>
      {children}
    </DashboardContext.Provider>
  );
};

/**
 *  Get the dashboard context
 *
 */
export const useDashboardContext = () => {
  const dashboardContext = useContext(DashboardContext);

  if (!dashboardContext)
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );

  return dashboardContext;
};
