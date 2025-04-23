import React, { createContext, ReactNode, useContext } from "react";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import {SubmitHandler} from "react-hook-form";
import { DashboardContextProps } from "@/types/dashboard";


// Define a custom FormData interface to avoid conflicts
interface CustomFormData {
  [key: string]: any;
}

// hook
import { useDashboard } from "@/hooks/dashboard/useDashboard";


const DashboardContext = createContext<DashboardContextProps & {
    handleYearSelection: (year: number) => void;
    handleFilterChange: (filter: InflationFilters) => void;
    onSubmit: SubmitHandler<CustomFormData>;
  } | null>(null);
 
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dashboardState = useDashboard();

  return (
    <DashboardContext.Provider value={dashboardState as DashboardContextProps & {
      handleYearSelection: (year: number) => void;
      handleFilterChange: (filter: InflationFilters) => void;
      onSubmit: SubmitHandler<CustomFormData>;
    }}>
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
