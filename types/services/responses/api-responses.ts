/**
 * Represents a standardized API response structure.
 * @export
 * @typedef {Object} ApiResponse
 * @template T - The type of the data being returned in the response.
 * @property {T} [data] - The data to include in the response.
 * @property {string} [message] - A message describing the response.
 * @property {"success" | "fail" | "error"} status - The status of the response.
 */
export type ApiResponse<T = null> = {
  /**
   * The data to include in the response.
   * @type {T}
   * @memberof ApiResponse
   */
  data?: T;
  /**
   * A message describing the response.
   * @type {string}
   * @memberof ApiResponse
   */
  message?: string;
  /**
   * The status of the response.
   * @type {"success" | "fail" | "error"}
   * @memberof ApiResponse
   */
  status: "success" | "fail" | "error";
};
