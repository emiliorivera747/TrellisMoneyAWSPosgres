import { AuthError } from "@supabase/supabase-js";

/**
 * Represents an error detail with a path and message.
 * @export
 * @interface ErrorDetail
 */
export interface ErrorDetail {
  /**
   * The path where the error occurred.
   * @type {string}
   * @memberof ErrorDetail
   */
  path: string;
  /**
   * The error message.
   * @type {string}
   * @memberof ErrorDetail
   */
  message: string;
}

/**
 * Represents a successful state.
 * @export
 * @interface SuccessState
 */
export interface SuccessState {
  /**
   * The status of the state.
   * @type {"success"}
   * @memberof SuccessState
   */
  status: "success";
  /**
   * The success message.
   * @type {string}
   * @memberof SuccessState
   */
  message: string;
  /**
   * The user information.
   * @type {{ email: string }}
   * @memberof SuccessState
   */
  user: { email: string };
}

/**
 * Represents an error state.
 * @export
 * @interface ErrorState
 */
export interface ErrorState {
  /**
   * The status of the state.
   * @type {"error"}
   * @memberof ErrorState
   */
  status: "error";
  /**
   * The error message.
   * @type {string | null}
   * @memberof ErrorState
   */
  message: string | null;
  /**
   * The errors that occurred.
   * @type {Array<ErrorDetail> | AuthError | unknown}
   * @memberof ErrorState
   */
  errors?: Array<ErrorDetail> | AuthError | unknown;
}

/**
 * Represents a state that can be either success, error, or null.
 * @export
 * @typedef {SuccessState | ErrorState | null} State
 */
export type State = SuccessState | ErrorState | null;
