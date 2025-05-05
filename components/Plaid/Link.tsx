"use client";
import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null;
}

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
      className="bg-primary-600 text-white rounded-[12px] px-2 py-3"
      onClick={() => open()}
      disabled={!ready}
    >
      Link account
    </button>
  );
};

export default Link;
