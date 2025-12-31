/**
 * A React functional component that displays an error message.
 *
 * @param {Object} props - The props object.
 * @param {null | Error} props.error - The error object to display. If `null`, a default message is shown.
 *
 * @returns {JSX.Element} A `div` element containing the error message or a default "Unknown error" message.
 */
const AssetErrors = ({ error }: { error: null | Error }) => {
  return <div>There was an Error: {error?.message || "Unknown error"}</div>;
};

export default AssetErrors;
