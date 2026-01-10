/**
 * Logs an error message to the console with a specific prefix.
 *
 * @param msg - The error message to be logged.
 */
export const logErrorAndThrow = (msg: string) => {
    console.error(`${msg}`);
    throw new Error(msg);
};
