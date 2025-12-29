import { useState, useEffect } from "react";
import { usePlaidLink, PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import plaidService from "@/features/plaid-link/services/plaidServices";
import useExchangeToken from "@/hooks/react-query/plaid/useExchangeToken";

/**
 * Custom hook to manage the Plaid connection flow.
 *
 * This hook provides functionality to initiate the Plaid Link flow,
 * handle the exchange of the public token for an access token, and
 * manage the state of the Plaid Link component.
 *
 * @returns {Object} An object containing:
 * - `start`: A function to start the Plaid connection flow by generating a link token.
 * - `error`: Any error encountered during the Plaid Link flow.
 *
 * @example
 * const { start, error } = usePlaidConnectionFlow();
 *
 * // Start the Plaid connection flow
 * await start(userId);
 *
 * // Handle any errors
 * if (error) {
 *   console.error("Plaid Link error:", error);
 * }
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
