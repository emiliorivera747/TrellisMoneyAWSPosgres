/**
 * A functional component that displays a connection error message.
 *
 * @param {Object} props - The props object.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} A paragraph element containing the error message.
 */
const ConnectionError = ({ message }: { message: string }) => {
  return <p>Error loading Plaid: {message}</p>;
};

export default ConnectionError;
