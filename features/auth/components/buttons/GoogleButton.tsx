"use client";

// React & Next
import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Utils
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

// Components
import DotLoader from "@/components/loading/DotLoader";

// Types
import { GoogleButtonProps } from "@/features/auth/types/buttons/buttons";

const defaultClass =
  "mb-4 px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] w-full text-sm font-medium text-tertiary-700 border border-gray-300 shadow-sm hover:bg-tertiary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4";

/**
 * Renders a Google sign-in button using Supabase OAuth.
 *
 * @param {GoogleButtonProps} props - Component props.
 * @returns {JSX.Element} Google sign-in button.
 *
 * @example
 * <GoogleButton label="Sign in with Google" dataTestID="google-sign-in-button" />
 */
const GoogleButton = ({
  label,
  dataTestID,
  className,
  ref,
}: GoogleButtonProps) => {
  const searchParams = useSearchParams();
  const plan = searchParams?.get("plan") ?? null;

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setIsGoogleLoading(true);

    try {
      const redirectTo = plan
        ? `${window.location.origin}/auth/callback?plan=${plan}`
        : `${window.location.origin}/auth/callback`;

      const error_callback = `${window.location.origin}/auth-error`;

      // Sign in with Google
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            error_callback,
          },
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
