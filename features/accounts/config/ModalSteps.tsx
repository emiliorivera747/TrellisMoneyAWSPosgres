// Components
import MemberCard from "@/features/accounts/components/household/MemberCard";
import AddMemberCard from "@/features/accounts/components/household/AddMemberCard";

// Types
import { StepProps, Step } from "@/features/accounts/types/household";

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
export const getSteps = ({ householdResponse, clickFn }: StepProps): Step[] => [
  {
    title: "Select Account Owner",
    description: "Who owns this account?",
    content: (
      <div className="h-full gap-2 flex flex-col">
        <MemberCard householdResponse={householdResponse} clickFn={clickFn} />
        <AddMemberCard
          householdResponse={householdResponse}
          clickFn={clickFn}
        />
      </div>
    ),
  },
  {
    title: "Add a member",
    description: "",
    content: <div>Form</div>,
  },
];
