"use client";

// React
import { useCallback } from "react";

// External Libraries
import { usePlaidLink } from "react-plaid-link";

// Types
import { LinkProps } from "@/types/services/plaid/plaid";

// Utils
import { cn } from "@/lib/utils";

const Link = ({ linkToken, ref, className, itemId }: LinkProps) => {
  const onSuccess = useCallback(async (public_token: string, metadata: any) => {
    if (itemId !== null) {
      // Handle Update mode
    } else {
      // Note: This component needs member_id to exchange token properly
      // Consider using usePlaidConnectionFlow hook instead
      console.warn("Link component: member_id is required for token exchange");
    }
  }, [itemId]);

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
