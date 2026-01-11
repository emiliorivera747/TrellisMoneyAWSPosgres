/**
 * Logs an error message to the console with a specific prefix.
 *
 * @param msg - The error message to be logged.
 */
export const logErrorAndThrow = (msg: string | Error | unknown) => {
  let message = msg instanceof Error ? msg.message : msg;
  console.error(`${message} \n`);
  throw new Error(String(message));
};
