"use client";
import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

import { LinkProps } from "@/types/plaid";

const Link = (props: LinkProps) => {
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
    token: props.linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button
      style={{boxShadow: "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px"}}
      className="rounded-[12px] px-4 py-4 border border-tertiary-300 text-tertiary-1000 hover:bg-tertiary-100"
      onClick={() => open()}
      disabled={!ready}
    >
      Link account
    </button>
  );
};

export default Link;
