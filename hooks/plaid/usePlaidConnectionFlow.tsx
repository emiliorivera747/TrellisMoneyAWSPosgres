import { useState, useEffect } from "react";
import { usePlaidLink, PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import plaidService from "@/features/plaid-link/services/plaidServices";
import useExchangeToken from "@/hooks/react-query/plaid/useExchangeToken";

/**
 * Hook to manage Plaid connection flow.
 *
 * @returns {Object} 
 * - `start`: Initiates Plaid Link flow.
 * - `error`: Error from Plaid Link flow.
 *
 * @example
 * const { start, error } = usePlaidConnectionFlow();
 * await start(userId);
 * if (error) console.error("Plaid Link error:", error);
 */
const usePlaidConnectionFlow = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const { exchangeTokenMutate, isExchanging, hasExchangeError } =
    useExchangeToken();

  const { open, ready, error } = usePlaidLink({
    token: linkToken ?? null,
    onSuccess: async (
      publicToken: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      if (memberId) {
        exchangeTokenMutate({
          public_token: publicToken,
          metadata,
          member_id: memberId,
        });
      } else {
        console.error("User ID is null. Cannot exchange token.");
      }
    },
  });

  const start = async (memberId: string) => {
    setLinkToken(null);
    const res = await plaidService.createLinkToken(memberId);
    setLinkToken(res.data.link_token);
    setMemberId(memberId);
  };

  useEffect(() => {
    if (linkToken && ready) open();
  }, [linkToken, ready, open]);

  return { start, error };
};

export default usePlaidConnectionFlow;
