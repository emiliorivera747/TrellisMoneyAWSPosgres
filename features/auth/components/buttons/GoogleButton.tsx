"use client";

// React & Next
import React, { useState } from "react";
import Image from "next/image";

// Utils
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

// Components
import DotLoader from "@/components/loading/DotLoader";

//types
import { GoogleButtonProps } from "@/features/auth/types/buttons/buttons";

const defaultClass = 'mb-4 px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] w-full text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-[#f1f3f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4';

const GoogleButton = ({ label, dataTestID, className , ref }: GoogleButtonProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const stripePaymentLink = localStorage.getItem("stripePaymentLink");
      const redirectTo = stripePaymentLink
        ? `${window.location.origin}/auth/callback?stripePaymentLink=${encodeURIComponent(stripePaymentLink)}`
        : `${window.location.origin}/auth/callback`;

      // Sign in with Google
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
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
