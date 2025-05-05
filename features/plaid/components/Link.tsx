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
  const defualtClassName =
    "bg-gradient-to-r form-secondary-900 to-secondary-1000 bg-secondary-900 text-[0.8rem] rounded-[12px] px-4 py-4 text-tertiary-1000 hover:bg-tertiary-100 text-white";

  return (
    <button
      ref={ref}
      // style={{
      //   boxShadow:
      //     "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px",
      // }}
      className={cn(defualtClassName, className)}
      onClick={() => open()}
      disabled={!ready}
    >
      Connect your account
    </button>
  );
};

export default Link;
