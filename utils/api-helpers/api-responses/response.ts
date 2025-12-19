// utils/api-helpers/response.ts

import { NextResponse } from "next/server";

type ApiResponse<T = null> = {
  data?: T;
  message?: string;
  status: "success" | "fail" | "error";
};

export const apiSuccess = <T>(
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

export const apiFail = (
  message: string,
  statusCode: number
) => {
  const body: ApiResponse = {
    message,
    status: "fail",
  };

  return NextResponse.json(body, { status: statusCode });
};

export const apiError = (
  error: unknown,
  statusCode: number = 500
) => {
  console.error("API Error:", error);

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return NextResponse.json(
    { message, status: "error" },
    { status: statusCode }
  );
};