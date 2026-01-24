import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import plaidService from "@/features/plaid-link/services/plaidServices";
import { usePlaidLink } from "react-plaid-link";

/**
 * Custom hook to integrate with the Plaid Link flow.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {string | null} params.linkToken - The link token provided by Plaid to initialize the Plaid Link flow.
 *
 * @returns {Object} - An object containing the following:
 *   - `open` (function): A function to open the Plaid Link UI.
 *   - `ready` (boolean): A boolean indicating whether the Plaid Link UI is ready to be opened.
 *   - `error` (Error | null): An error object if there was an issue initializing Plaid Link, otherwise `null`.
 *
 * @example
 * const { open, ready, error } = usePlaid({ linkToken });
 * if (ready) {
 *   open();
 * }
 */
const usePlaid = ({ linkToken }: { linkToken: string | null }) => {
  const { open, ready, error } = usePlaidLink({
    token: linkToken ?? null,
    onSuccess: async (
      publicToken: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      // Note: This hook needs member_id to exchange token properly
      // Consider using usePlaidConnectionFlow hook instead
      console.warn("usePlaid hook: member_id is required for token exchange");
    },
  });
  return { open, ready, error };
};

export default usePlaid;
