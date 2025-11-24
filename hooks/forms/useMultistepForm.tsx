import { useState, useCallback } from "react";

interface Step<T = React.ReactNode> {
  title?: string;
  description?: string;
  content: T;
}

interface UseMultistepFormReturn<T> {
  currentStep: Step<T>;
  currentIndex: number;
  steps: Step<T>[];
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
  setStep: (index: number) => void;
}

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
    setStep: goTo,
  };
}
