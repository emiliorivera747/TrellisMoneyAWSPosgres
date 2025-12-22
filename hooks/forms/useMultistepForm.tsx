import { useState, useCallback } from "react";
import { UseMultistepFormReturn, Step } from "@/types/multistep-form";

/**
 * Allows to you add mutiple steps fo a form
 */
export function useMultistepForm<T>(
  steps: Step<T>[]
): UseMultistepFormReturn<T> {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < steps.length) {
        setCurrentIndex(index);
      }
    },
    [steps.length]
  );

  const goToRoute = useCallback(
    (route: string) => {
      const index = steps.findIndex((step) => step.route === route);
      if (index !== -1) setCurrentIndex(index);
    },
    [steps]
  );

  const next = useCallback(() => {
    setCurrentIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  }, [steps.length]);

  const back = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? i : i - 1));
  }, []);

  
  return {
    currentStep: steps[currentIndex],
    currentIndex,
    steps,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === steps.length - 1,
    goTo,
    next,
    back,
    goToRoute,
    setStep: goTo,
  };
}
