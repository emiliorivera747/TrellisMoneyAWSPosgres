
/**
 * A reusable button component that triggers a refresh action.
 *
 * @param {Object} props - The component props.
 * @param {() => void} props.onClickFn - The function to execute when the button is clicked.
 * @returns {JSX.Element} A styled button with a refresh icon and label.
 */
const RefreshButton = ({ onClickFn }: { onClickFn: () => void }) => {
  return (
    <button
      className="border px-4 py-2 rounded-full flex items-center justify-center gap-2 mb-4 hover:bg-tertiary-100"
      onClick={() => onClickFn()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
      Refresh
    </button>
  );
};

export default RefreshButton;
