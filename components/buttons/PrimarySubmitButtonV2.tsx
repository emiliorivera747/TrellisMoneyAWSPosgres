import { useFormStatus } from "react-dom";
import DotLoader from "@/components/loading/DotLoader";
import { SubmitButtonPropsV2 } from "@/types/components/buttons/buttons";
import { cn } from "@/lib/utils";

/**
 * A primary submit button component with customizable text, styling, and loading state.
 *
 * @component
 * @param {SubmitButtonPropsV2} props - The props for the PrimarySubmitButton component.
 * @param {string} [props.text="Submit"] - The text to display on the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {boolean} [props.isLoading] - Indicates whether the button is in a loading state.
 * @param {React.Ref<HTMLButtonElement>} [props.ref] - A ref to attach to the button element.
 * @returns {JSX.Element} The rendered PrimarySubmitButton component.
 *
 * @example
 * <PrimarySubmitButton
 *   text="Save"
 *   className="custom-class"
 *   isLoading={false}
 *   ref={buttonRef}
 * />
 */
const PrimarySubmitButton = ({
  text = "Submit",
  className,
  isLoading,
  ref,
}: SubmitButtonPropsV2) => {
  const { pending } = useFormStatus();
  const defaultClass = `flex items-center justify-center w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300`;

  return (
    <button
      type="submit"
      className={cn(defaultClass, className)}
      disabled={pending || isLoading}
      ref={ref}
    >
      {pending || isLoading ? (
        <DotLoader
          bgColor="bg-blue-200"
          dotHeight="h-2"
          dotWidth="w-2"
          containerHeight="h-5"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default PrimarySubmitButton;
