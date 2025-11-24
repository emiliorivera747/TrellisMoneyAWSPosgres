import { useState } from "react";

interface UseMultistepFormReturn<T> {
  goToStep: (index: number) => void;
  next: () => void;
  previous: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  getStep: () => T;
}

/**
 * Allows to you add mutiple steps fo a form
 */
export function useMultistepForm<T>(steps: T[]): UseMultistepFormReturn<T> {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function previous() {
    setIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  return {
    goToStep: (index: number) => setIndex(index),
    next,
    previous,
    isLastStep: index === steps.length - 1,
    isFirstStep: index === 0,
    getStep: () => steps[index],
  };
}
