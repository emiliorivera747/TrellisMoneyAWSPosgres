"use client";

// React & Next
import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Utils
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

// Components
import DotLoader from "@/components/loading/DotLoader";

//types
import { GoogleButtonProps } from "@/features/auth/types/buttons/buttons";

const defaultClass =
  "mb-4 px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] w-full text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-[#f1f3f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4";

/**
 * A React functional component that renders a Google sign-in button.
 * The button initiates the OAuth sign-in process with Google using Supabase.
 *
 * @param {Object} props - The props for the GoogleButton component.
 * @param {string} props.label - The label text to display on the button.
 * @param {string} props.dataTestID - The data-testid attribute for testing purposes.
 * @param {string} props.className - Additional CSS classes to apply to the button.
 * @param {React.Ref<HTMLButtonElement>} props.ref - A ref to the button element.
 *
 * @returns {JSX.Element} The rendered Google sign-in button component.
 *
 * @remarks
 * - The button displays a loading indicator while the sign-in process is in progress.
 * - The `signInWithGoogle` function handles the OAuth sign-in process and passes
 *   a `price_id` in the state parameter for redirection.
 * - The `supabase.auth.signInWithOAuth` method is used to initiate the sign-in process.
 *
 * @example
 * ```tsx
 * <GoogleButton
 *   label="Sign in with Google"
 *   dataTestID="google-sign-in-button"
 *   className="custom-class"
 *   ref={buttonRef}
 * />
 * ```
 */
const GoogleButton = ({
  label,
  dataTestID,
  className,
  ref,
}: GoogleButtonProps) => {
  const searchParams = useSearchParams();
  const price_id = searchParams?.get("price_id") ?? "";

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;

      const stateObj = {price_id};

      const state = Buffer.from(JSON.stringify(stateObj), "utf-8").toString("base64url");

      // Sign in with Google
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: { state },
        },
      });

      if (error) throw error;
    } catch (error) {
      setIsGoogleLoading(false);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <button
      onClick={signInWithGoogle}
      className={cn(defaultClass, className)}
      disabled={isGoogleLoading}
      ref={ref}
    >
      {isGoogleLoading ? (
        <DotLoader bgColor="bg-primary-300" dataTestID={dataTestID} />
      ) : (
        <>
          <div className="flex-shrink-0">
            <Image
              src="/google_logo.png"
              width={20}
              height={20}
              alt="google logo"
            />
          </div>
          {label}
        </>
      )}
    </button>
  );
};

export default GoogleButton;
