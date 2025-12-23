// Types
import { Step } from "@/features/accounts/types/household";

// Components
import SelectOwnerStep from "@/features/accounts/components/modal-steps/SelectOwnerStep";
import AddMemberForm from "@/features/accounts/components/modal-steps/AddMemberForm";

/**
 * Generates an array of steps to be used in a modal workflow.
 *
 * @param {StepProps} params - The parameters for generating the steps.
 * @param {HouseholdResponse} params.householdResponse - The household data used to populate the steps.
 * @param {Function} params.clickFn - The function to handle click events within the steps.
 *
 * @returns {Step[]} An array of step objects, each containing a title, description, and content.
 *
 * @example
 * const steps = getSteps({
 *   householdResponse: householdData,
 *   clickFn: handleClick,
 * });
 */
export const getSteps = (): Step[] => [
  {
    title: "Select Account Owner",
    route: "owner",
    description: "Who owns this account?",
    content: <SelectOwnerStep />,
  },
  {
    title: "Add a member",
    route: "add-member",
    description: "",
    content: <AddMemberForm />,
  },
];
