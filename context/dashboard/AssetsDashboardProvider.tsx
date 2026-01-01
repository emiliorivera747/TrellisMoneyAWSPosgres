import React, { createContext, ReactNode, useContext } from "react";
import { AssetsFormState } from "@/types/dashboard";

// Hooks
import { useAssetsForm } from "@/hooks/dashboard/useDashboard";

/**
 * Dashboard  context
 */
const AssetsFormContext = createContext<AssetsFormState | null>(null);

export const AssetsDashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dashboardState = useAssetsForm();

  return (
    <AssetsFormContext.Provider value={dashboardState}>
      {children}
    </AssetsFormContext.Provider>
  );
};

/**
 *  Get the dashboard context
 *
 */
export const useAssetsFormContext = () => {
  const assestContext = useContext(AssetsFormContext);

  if (!assestContext)
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );

  return assestContext;
};
