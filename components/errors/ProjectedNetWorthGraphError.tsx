/**
 * A functional React component that displays an error message
 * when there is an issue fetching data for the Projected Net Worth Graph.
 *
 * @param {Object} props - The props object.
 * @param {Error | null} props.error - The error object containing details about the error.
 * If no error is present, it will be `null`.
 *
 * @returns {JSX.Element} A styled div element that displays the error message.
 */
const ProjectedNetWorthGraphError = ({
  error,
}: {
  error: Error | null | undefined;
}) => {
  return (
    <div className="h-[30rem] border border-tertiary-400 px-10 rounded-xl  flex items-center justify-center text-lg font-light text-tertiary-800">
      There was an error fetching the data: {error?.message}
    </div>
  );
};

export default ProjectedNetWorthGraphError;
