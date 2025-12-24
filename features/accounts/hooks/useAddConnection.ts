import { useState } from "react";
import { getSteps } from "@/features/accounts/config/ModalSteps";
import { Step } from "@/features/accounts/types/household";
import { useMultistepForm } from "@/hooks/forms/useMultistepForm";

/**
 * Custom hook to manage the process of adding a connection.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {(userId: string) => Promise<void>} params.generateToken - A function to generate a token for a given user ID.
 * @returns {Object} - The state and functions to manage the connection process.
 * @property {boolean} isDialogOpen - Indicates whether the dialog for adding a connection is open.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsDialogOpen - Function to update the dialog open state.
 * @property {any} householdResponse - The response data containing household members.
 * @property {boolean} isLoadingHousehold - Indicates whether the household data is currently being loaded.
 * @property {boolean} isErrorHousehold - Indicates whether there was an error while fetching household data.
 * @property {(userId: string) => Promise<void>} handleSelectUser - Function to handle user selection and trigger token generation for the selected user.
 * @property {Step} currentStep - The current step in the multi-step form process.
 * @property {boolean} isFirstStep - Indicates whether the current step is the first step in the process.
 * @property {boolean} isLastStep - Indicates whether the current step is the last step in the process.
 * @property {() => void} back - Function to navigate to the previous step in the multi-step form.
 * @property {() => void} next - Function to navigate to the next step in the multi-step form.
 */
export const useAddConnection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const steps: Step[] = getSteps();

  const { currentStep, goToRoute } = useMultistepForm(steps);

  const open = () => setIsDialogOpen(true);
  const close = () => setIsDialogOpen(false);

  return {
    isDialogOpen,
    steps,
    setIsDialogOpen,
    goToRoute,
    currentStep,
    open,
    close,
  };
};
