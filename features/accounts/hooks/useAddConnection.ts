import { useState } from "react";
import { getSteps } from "@/features/accounts/config/ModalSteps";
import { Step } from "@/features/accounts/types/household";
import { useMultistepForm } from "@/hooks/forms/useMultistepForm";

/**
 * Manages adding a connection.
 *
 * @param {Object} params - Hook parameters.
 * @param {(userId: string) => Promise<void>} params.generateToken - Token generator.
 * @returns {Object} - Connection state and actions.
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
