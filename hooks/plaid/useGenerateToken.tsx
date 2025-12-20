import { useState } from "react";
import plaidService from "@/features/plaid-link/services/plaidServices";

/**
 * Custom hook to generate a Plaid link token for a given user ID.
 *
 * This hook provides a `linkToken` state and a `generateToken` function
 * to create a new Plaid link token. The `generateToken` function resets
 * the `linkToken` state to `null` before attempting to fetch a new token.
 * If the token generation is successful, the `linkToken` state is updated
 * with the new token. In case of an error, the `linkToken` state remains `null`,
 * and the error is thrown.
 *
 * @returns {Object} An object containing:
 * - `linkToken` (string | null): The current Plaid link token, or `null` if not set.
 * - `generateToken` (function): An asynchronous function that accepts a `user_id` (string)
 *   and generates a new Plaid link token for the given user.
 *
 * @example
 * const { linkToken, generateToken } = useGenerateToken();
 *
 * useEffect(() => {
 *   const fetchToken = async () => {
 *     try {
 *       const token = await generateToken("user123");
 *       console.log("Generated token:", token);
 *     } catch (error) {
 *       console.error("Error generating token:", error);
 *     }
 *   };
 *   fetchToken();
 * }, []);
 */
const useGenerateToken = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const generateToken = async (user_id: string) => {
    setLinkToken(null);
    try {
      const res = await plaidService.createLinkToken(user_id);
      setLinkToken(res.link_token);
      return res.link_token;
    } catch (error) {
      setLinkToken(null);
      throw error;
    }
  };
  return { linkToken, generateToken };
};

export default useGenerateToken;
