export interface Step<T = React.ReactNode> {
  title?: string;
  description?: string;
  content: T;
  route?: string;
}

export interface UseMultistepFormReturn<T> {
  currentStep: Step<T>;
  currentIndex: number;
  steps: Step<T>[];
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
  goToRoute: (route: string) => void;
  setStep: (index: number) => void;
}

export interface UseMultistepFormReturnWithNav<T> {
  currentRoute: Step<T>;
  routes: Map<string, Step<T>>;
  goTo: (route: string) => void;
}
