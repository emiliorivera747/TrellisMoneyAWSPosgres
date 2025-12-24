import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import usePlaidConnectionFlowfrom from "@/hooks/plaid/usePlaidConnectionFlow";
import { useAddConnection } from "@/features/accounts/hooks/useAddConnection";
import { Step } from "@/types/multistep-form";

interface ConnectionContextType {
  start: (userId: string) => Promise<void>;
  error: ErrorEvent | null;
  isDialogOpen: boolean;
  steps: Step[];
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  currentStep: Step;
  goToRoute: (route: string) => void;
  open: () => void;
  close: () => void;
}

const ConnectionContext = createContext<ConnectionContextType | null>(null);

/**
 * Provides the connection context to its children components.
 * This context includes functionality and state related to managing
 * a connection flow, such as starting the flow, handling errors,
 * managing dialog visibility, and tracking the current step.
 *
 * @param {Object} props - The props for the ConnectionProvider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the connection context.
 *
 * @returns {JSX.Element} A context provider that wraps the children components.
 *
 * @context
 * - `start`: Function to initiate the connection flow.
 * - `error`: Any error encountered during the connection flow.
 * - `isDialogOpen`: Boolean indicating whether the dialog is open.
 * - `steps`: The steps involved in the connection flow.
 * - `setIsDialogOpen`: Function to toggle the dialog's visibility.
 * - `currentStep`: The current step in the connection flow.
 */
export const ConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { start, error } = usePlaidConnectionFlowfrom();
  const {
    isDialogOpen,
    steps,
    setIsDialogOpen,
    currentStep,
    goToRoute,
    open,
    close,
  } = useAddConnection();

  return (
    <ConnectionContext.Provider
      value={{
        start,
        error,
        isDialogOpen,
        steps,
        setIsDialogOpen,
        currentStep,
        goToRoute,
        open,
        close,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

/**
 * Custom hook to access the `ConnectionContext`.
 *
 * This hook provides the current value of the `ConnectionContext`.
 * It ensures that the hook is used within a `DashboardProvider` component.
 *
 * @throws Will throw an error if the hook is used outside of a `DashboardProvider`.
 *
 * @returns The current value of the `ConnectionContext`.
 */
export const useConnectionContext = () => {
  const connectionContext = useContext(ConnectionContext);
  if (!connectionContext)
    throw "useConnectionContext must be used within a DashboardProvider";
  return connectionContext;
};
