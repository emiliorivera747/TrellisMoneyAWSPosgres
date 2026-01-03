"use client";
import { PrimaryHeader } from "@/components/marketing/headers/Headers";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * AuthErrorPage Component
 *
 * This component renders an authentication error page that displays an error message
 * based on the query parameters or hash parameters in the URL. It provides a user-friendly
 * interface to inform users about authentication issues and offers a link to navigate back
 * to the home page.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered authentication error page.
 *
 * @remarks
 * - The component uses `useSearchParams` to retrieve query parameters from the URL.
 * - It also parses the URL hash to extract error-related parameters.
 * - The error message is dynamically generated based on the `error` and `error_description` values.
 *
 * @example
 * ```tsx
 * import AuthErrorPage from './auth-code-error/page';
 *
 * function App() {
 *   return <AuthErrorPage />;
 * }
 * ```
 *
 * @dependencies
 * - React hooks: `useState`, `useEffect`
 * - `useSearchParams` for accessing URL query parameters
 *
 * @styles
 * - The component uses Tailwind CSS classes for styling.
 * - Inline styles are applied to the "Go back to home" link for hover effects and box shadow.
 *
 * @errorHandling
 * - Handles the following error types:
 *   - `signup_disabled`: Displays a message indicating that signups are disabled.
 *   - `access_denied`: Displays a message indicating access was denied.
 *   - Default: Displays a generic authentication error message.
 *
 * @navigation
 * - Includes a link to navigate back to the home page (`/sign-up`).
 */
export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    setError(hashParams.get("error") || searchParams.get("error"));
    setErrorDescription(
      hashParams.get("error_description") ||
        searchParams.get("error_description")
    );
  }, [searchParams]);

  const getErrorMessage = () => {
    if (error === "signup_disabled")
      return (
        errorDescription ||
        "Signups are currently disabled for this instance. Please contact support for more information."
      );

    if (error === "access_denied")
      return (
        errorDescription ||
        "Access was denied. Please check your credentials or contact support."
      );

    return (
      errorDescription ||
      "We encountered an issue during the authentication process. Please try again or contact support if the issue persists."
    );
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center h-[50vh] w-[60%] rounded-[12px] mx-[5%] px-20">
        <PrimaryHeader label={"Authentication Error"} />
        <p className="pt-6 pb-8 text-[#c92a2a] font-light">
          {getErrorMessage()}
        </p>
        <a
          href="/"
          className="py-4 px-4 rounded-[12px] hover:bg-tertiary-200"
          style={{
            boxShadow: `rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px`,
          }}
        >
          Go back to home
        </a>
      </div>
    </section>
  );
}
