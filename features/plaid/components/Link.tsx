"use client";
import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

import { LinkProps } from "@/types/plaid";
import { cn } from "@/lib/utils";

const Link = ({ linkToken, ref, className }: LinkProps) => {
  const onSuccess = useCallback(async (public_token: string) => {
    // send public_token to server
    const response = await fetch("/api/plaid/exchange-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token }),
    });
    // Handle response ...
    //(response);
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  const defaultClassName =
    "w-full bg-gradient-to-r from-tertiary-800 to-tertiary-900 hover:from-tertiary-900 hover:to-tertiary-1000 text-[0.8rem] rounded-[12px] px-4 py-4 text-tertiary-1000 hover:bg-tertiary-100 text-white font-extrabold";

  return (
    <button
      ref={ref}
      className={cn(defaultClassName, className)}
      onClick={() => open()}
      disabled={!ready}
    >
      Connect your account
    </button>
  );
};

export default Link;
