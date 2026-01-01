import React, {
  createContext,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { AssetsFormState } from "@/types/dashboard";
import { useForm } from "react-hook-form";

export interface FormData {
  [key: string]: number;
}

/**
 * Dashboard  context
 */
const AssetsFormContext = createContext<AssetsFormState | null>(null);

export const AssetsDashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const form = useForm<FormData>({
    defaultValues: {},
  });

  const resetForm = useCallback(() => {
    form.reset();
  }, [form]);
  return (
    <AssetsFormContext.Provider value={{ form, resetForm }}>
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
