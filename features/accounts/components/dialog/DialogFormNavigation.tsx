import PrimaryModalButton from "@/components/buttons/PrimaryModalButton";

/**
 * A functional component that renders navigation buttons for a dialog.
 * 
 * @param {Object} props - The props object.
 * @param {boolean} props.isFirstStep - Indicates whether the current step is the first step.
 * @param {() => void} props.back - A callback function to navigate to the previous step.
 * @param {() => void} props.next - A callback function to navigate to the next step.
 * 
 * @returns {JSX.Element} The rendered navigation buttons.
 * 
 * @remarks
 * - If `isFirstStep` is `true`, the "Previous" button is not displayed.
 * - The "Next" button is always displayed and aligned to the right.
 * - The `PrimaryModalButton` component is used for rendering the buttons.
 */
const DialogNavigation = ({ isFirstStep, back, next }: { isFirstStep: boolean; back: () => void; next: () => void; }) => {
  return (
    <>
      {!isFirstStep && (
        <PrimaryModalButton
          className="px-4 py-2 bg-gray-200 rounded-[12px]"
          onClickFn={() => back()}
          label="Previous"
        />
      )}
      <div className="flex justify-end w-full">
        <PrimaryModalButton
          className="px-4 py-2 bg-primary-800 rounded-[12px]"
          onClickFn={() => next()}
          label="Next"
        />
      </div>
    </>
  );
};

export default DialogNavigation;
