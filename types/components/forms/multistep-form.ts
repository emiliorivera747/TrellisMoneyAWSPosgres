/**
 * Represents a step in a multi-step form.
 * @export
 * @interface Step
 * @template T - The type of the step content, defaults to React.ReactNode.
 */
export interface Step<T = React.ReactNode> {
  /**
   * The step title.
   * @type {string}
   * @memberof Step
   */
  title?: string;
  /**
   * The step description.
   * @type {string}
   * @memberof Step
   */
  description?: string;
  /**
   * The step content.
   * @type {T}
   * @memberof Step
   */
  content: T;
  /**
   * The route associated with the step.
   * @type {string}
   * @memberof Step
   */
  route?: string;
}

/**
 * Represents the return value of a multi-step form hook.
 * @export
 * @interface UseMultistepFormReturn
 * @template T - The type of the step content.
 */
export interface UseMultistepFormReturn<T> {
  /**
   * The current step.
   * @type {Step<T>}
   * @memberof UseMultistepFormReturn
   */
  currentStep: Step<T>;
  /**
   * The current step index.
   * @type {number}
   * @memberof UseMultistepFormReturn
   */
  currentIndex: number;
  /**
   * All steps.
   * @type {Step<T>[]}
   * @memberof UseMultistepFormReturn
   */
  steps: Step<T>[];
  /**
   * Whether this is the first step.
   * @type {boolean}
   * @memberof UseMultistepFormReturn
   */
  isFirstStep: boolean;
  /**
   * Whether this is the last step.
   * @type {boolean}
   * @memberof UseMultistepFormReturn
   */
  isLastStep: boolean;
  /**
   * Function to go to a specific step by index.
   * @type {(index: number) => void}
   * @memberof UseMultistepFormReturn
   */
  goTo: (index: number) => void;
  /**
   * Function to go to the next step.
   * @type {() => void}
   * @memberof UseMultistepFormReturn
   */
  next: () => void;
  /**
   * Function to go to the previous step.
   * @type {() => void}
   * @memberof UseMultistepFormReturn
   */
  back: () => void;
  /**
   * Function to go to a specific step by route.
   * @type {(route: string) => void}
   * @memberof UseMultistepFormReturn
   */
  goToRoute: (route: string) => void;
  /**
   * Function to set the current step by index.
   * @type {(index: number) => void}
   * @memberof UseMultistepFormReturn
   */
  setStep: (index: number) => void;
}

/**
 * Represents the return value of a multi-step form hook with navigation.
 * @export
 * @interface UseMultistepFormReturnWithNav
 * @template T - The type of the step content.
 */
export interface UseMultistepFormReturnWithNav<T> {
  /**
   * The current route step.
   * @type {Step<T>}
   * @memberof UseMultistepFormReturnWithNav
   */
  currentRoute: Step<T>;
  /**
   * A map of routes to steps.
   * @type {Map<string, Step<T>>}
   * @memberof UseMultistepFormReturnWithNav
   */
  routes: Map<string, Step<T>>;
  /**
   * Function to go to a specific route.
   * @type {(route: string) => void}
   * @memberof UseMultistepFormReturnWithNav
   */
  goTo: (route: string) => void;
}
