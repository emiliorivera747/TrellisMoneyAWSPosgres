import { useConnectionContext } from "@/features/accounts/context/ConnectionContext";

/**
 * A button component that navigates to a specified route when clicked.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 * @returns {JSX.Element} A styled button with an icon and text.
 *
 * @example
 * <BactToRouteButton route="/dashboard" />
 *
 * @remarks
 * This component uses the `useConnectionContext` hook to access the `goToRoute` function
 * for navigation. Ensure that the context is properly set up in the parent component.
 */
const BackToRouteButton = ({ route }: { route: string }) => {
  const { goToRoute } = useConnectionContext();

  return (
    <div className="mb-4 my-1">
      <button
        className="text-xs text-tertiary-700 flex items-center justify-center font-light gap-1 hover:underline  border-tertiary-200 "
        onClick={() => goToRoute(route)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Account Owner
      </button>
    </div>
  );
};

export default BackToRouteButton;
