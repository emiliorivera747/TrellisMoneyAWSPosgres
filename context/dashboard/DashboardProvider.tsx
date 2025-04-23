import React, { createContext, ReactNode, useContext } from "react";

// hook
import { useDashboard } from "@/hooks/dashboard/useDashboard";

// types
import { DashboardContextProps } from "@/types/dashboard";

const DashboardContext = createContext<DashboardContextProps | null>(null);

/**
 *
 * When using the Dashboard provider the dashboard state is accessible for any components within
 * the provider
 *
 * @param param0
 * @returns
 */
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
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
