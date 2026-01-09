// utils/api-helpers/response.ts

import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/services-responses/api-responses";

/**
 * Generates a standardized success response for API requests.
 *
 * @template T - The type of the data being returned in the response.
 * @param {T | null} [data=null] - The data to include in the response. Defaults to `null`.
 * @param {string} [message="Success"] - A message describing the response. Defaults to `"Success"`.
 * @param {number} [statusCode=200] - The HTTP status code for the response. Defaults to `200`.
 * @returns {NextResponse} - A JSON response with the provided data, message, and status.
 */
export const SuccessResponse = <T>(
  data: T | null = null,
  message: string = "Success",
  statusCode: number = 200
) => {
  const body: ApiResponse<T> = {
    data: data ?? undefined,
    message,
    status: "success",
  };
  return NextResponse.json(body, { status: statusCode });
};

/**
 * Generates a failure response object to be used in API responses.
 *
 * @param message - A descriptive message explaining the failure.
 * @param statusCode - The HTTP status code associated with the failure.
 * @returns A JSON response object with a "fail" status and the provided message.
 *
 * @remarks
 * This function is designed to standardize the structure of failure responses
 * in the application. It uses `NextResponse.json` to format the response.
 *
 * @example
 * ```typescript
 * const response = FailResponse("Invalid request data", 400);
 * ```
 */
export const FailResponse = (message: string, statusCode: number) => {
  console.error("API Failure:", message);

  const body: ApiResponse = {
    message,
    status: "fail",
  };

  return NextResponse.json(body, { status: statusCode });
};

/**
 * Generates a standardized error response for API requests.
 *
 * @param error - The error object or value to be logged and included in the response.
 *                If the error is an instance of `Error`, its message will be used.
 *                Otherwise, a default message "An unexpected error occurred" will be used.
 * @param statusCode - The HTTP status code to be returned with the response.
 *                     Defaults to 500 if not provided.
 * @returns A `NextResponse` object containing a JSON payload with the error message
 *          and a status of "error", along with the specified HTTP status code.
 */
export const ErrorResponse = (error?: unknown, statusCode: number = 500) => {
  console.error("API Error:", error);

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return NextResponse.json(
    { message, status: "error" },
    { status: statusCode || 500 }
  );
};
