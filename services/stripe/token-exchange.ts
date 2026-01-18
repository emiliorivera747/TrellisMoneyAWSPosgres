import { client } from "@/config/plaidClient";

/**
 * Exchanges a public token for an access token using the Plaid client.
 *
 * @param publicToken - The public token to be exchanged.
 * @returns A promise resolving to the response from the token exchange.
 */
export const exchangePublicToken = async (publicToken: string) => {
  const response = await client.itemPublicTokenExchange({
    public_token: publicToken,
  });
  return response;
};
