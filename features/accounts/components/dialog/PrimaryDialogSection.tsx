import { DialogDescription } from "@/components/ui/dialog";

/**
 * A functional component that renders the primary section of a dialog.
 * It displays a description, a loading skeleton, or the content of the current step
 * based on the provided props.
 *
 * @param props - The props for the `PrimaryDialogSection` component.
 * @param props.currentStep - The current step object containing an optional description
 * and the content to be displayed.
 * @param props.currentStep.description - An optional string describing the current step.
 * @param props.currentStep.content - The React node representing the content of the current step.
 * @param props.isLoadingHousehold - A boolean indicating whether the household data is loading.
 * @param props.householdResponse - The response object containing household data.
 * @param props.householdResponse.data - An optional object containing household data.
 * @param props.householdResponse.data.members - An optional array of household members.
 *
 * @returns A `div` element containing the dialog section with a description, loading skeleton,
 * or the current step content.
 */
const PrimaryDialogSection = ({
  currentStep,
}: {
  currentStep: { description?: string; content: React.ReactNode };
}) => {
  return (
    <div className=" h-[20rem] px-4 overflow-scroll">
      {currentStep.description && (
        <DialogDescription className="flex items-center pb-4">
          {currentStep.description}
        </DialogDescription>
      )}
      {currentStep.content}
    </div>
  );
};

export default PrimaryDialogSection;
