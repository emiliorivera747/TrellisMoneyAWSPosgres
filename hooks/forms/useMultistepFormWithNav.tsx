import { useState, useCallback } from "react";
import { UseMultistepFormReturnWithNav, Step } from "@/types/multistep-form";

/**
 * Allows to you add mutiple steps fo a form
 */
export function useMultistepForm<T>(
  steps: Step<T>[]
): UseMultistepFormReturnWithNav<T> {
  const [currentRoute, setCurrentRoute] = useState(steps[0].route);
  const routes = new Map();
  const n = steps.length;

  for (let i = 0; i < n; i++) {
    routes.set(steps[i].route, steps[i]);
  }

  const goTo = useCallback(
    (route: string) => {
      setCurrentRoute(route);
    },
    [steps.length]
  );

  return {
    currentRoute: routes.get(currentRoute),
    routes,
    goTo,
  };
}
