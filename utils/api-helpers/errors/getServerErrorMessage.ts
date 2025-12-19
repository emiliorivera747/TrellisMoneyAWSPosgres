/**
 * Extracts and returns the error message from an Error object.
 * If the provided error is not an instance of Error, a default
 * "Internal server error" message is returned.
 *
 * @param error - The error object to extract the message from.
 * @returns The error message as a string.
 */
export const getServerErrorMessage = (error: Error | unknown) => {
  const errorMessage =
    error instanceof Error ? error.message : "Internal server error";
  return errorMessage;
};
