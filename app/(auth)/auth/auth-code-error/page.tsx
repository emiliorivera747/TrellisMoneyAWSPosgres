"use client";

// React
import { useEffect, useState } from "react";

// Next
import { useSearchParams } from "next/navigation";

// Header
import { PrimaryHeader } from "@/components/marketing/headers/Headers";

/**
 * Renders an authentication error page with messages based on URL parameters.
 * Includes a link to navigate back to the home page.
 */
import { Suspense } from "react";

export default function AuthErrorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorPage />
    </Suspense>
  );
}

function AuthErrorPage() {
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
        <span>
          Please contact{" "}
          <a href="mailto:emiliorivera@trellismoney.com">
            emiliorivera@trellismoney.com
          </a>{" "}
          if you would like to receive access. We are currently only allowing a
          select few to access the application.
        </span>
      );

    if (error === "access_denied")
      return (
        <span>
          Please contact{" "}
          <a href="mailto:emiliorivera@trellismoney.com">
            emiliorivera@trellismoney.com
          </a>{" "}
          if you would like to receive access. We are currently only allowing a
          select few to access the application.
        </span>
      );

    return (
      errorDescription ||
      "We encountered an issue during the authentication process. Please try again or contact support if the issue persists."
    );
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center h-[50vh] w-[60%] rounded-[12px] mx-[5%] px-20 gap-10">
        <PrimaryHeader label={"Authentication Error"} />
        <div className=" bg-[#fff5f5] rounded-[12px] px-8 py-6 border border-red-300">
          <p className="flex items-center  justify-center pt-6 pb-8 text-[#c92a2a] font-semibold">
            {getErrorMessage()}
          </p>
        </div>
        <a
          href="/"
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
