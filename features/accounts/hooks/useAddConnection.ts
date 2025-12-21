import { useState } from "react";
import { useFetchHouseholdMembers } from "@/features/accounts/hooks/useFetchHousehold";
import { getSteps } from "@/features/accounts/config/ModalSteps";
import { Step } from "@/features/accounts/types/household";
import { useMultistepForm } from "@/hooks/forms/useMultistepForm";

/**
 * Custom hook to manage the process of adding a connection.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {(userId: string) => Promise<void>} params.generateToken - A function to generate a token for a given user ID.
 *
 * @returns {Object} - The state and functions to manage the connection process.
 * @property {boolean} isDialogOpen - Indicates whether the dialog is open.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsDialogOpen - Function to set the dialog open state.
 * @property {string | null} selectedUserId - The currently selected user ID.
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setSelectedUserId - Function to set the selected user ID.
 * @property {any} householdResponse - The response data for household members.
 * @property {boolean} isLoadingHousehold - Indicates whether the household data is loading.
 * @property {boolean} isErrorHousehold - Indicates whether there was an error fetching household data.
 * @property {(userId: string) => Promise<void>} handleSelectUser - Function to handle user selection and token generation.
 * @property {Step} currentStep - The current step in the multi-step form.
 * @property {boolean} isFirstStep - Indicates whether the current step is the first step.
 * @property {boolean} isLastStep - Indicates whether the current step is the last step.
 * @property {() => void} back - Function to navigate to the previous step.
 * @property {() => void} next - Function to navigate to the next step.
 */
export const useAddConnection = ({
  generateToken,
}: {
  generateToken: (userId: string) => Promise<void>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { householdResponse, isLoadingHousehold, isErrorHousehold } =
    useFetchHouseholdMembers({ isDialogOpen });

  const handleSelectUser = async (userId: string) => {
    setIsDialogOpen(false);
    await generateToken(userId);
  };

  const steps: Step[] = getSteps({
    householdResponse,
    clickFn: handleSelectUser,
  });

  const { currentStep, isFirstStep, isLastStep, back, next } =
    useMultistepForm(steps);

  return {
    isDialogOpen,
    setIsDialogOpen,
    householdResponse,
    isLoadingHousehold,
    isErrorHousehold,
    handleSelectUser,
    currentStep,
    isFirstStep,
    isLastStep,
    back,
    next,
  };
};
