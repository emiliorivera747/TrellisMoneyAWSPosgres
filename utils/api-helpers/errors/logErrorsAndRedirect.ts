import { NextResponse } from "next/server";

export const logErrorAndRedirect = ({
  origin,
  error,
  message,
}: {
  origin: string;
  error?: Error;
  message?: string;
}) => {
  if (message) console.error("Error message:", message);
  if (error) console.error("Error details:", error.message, error.stack);
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
};
