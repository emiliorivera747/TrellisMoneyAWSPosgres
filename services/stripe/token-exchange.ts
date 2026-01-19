import { client } from "@/config/plaidClient";
import { PlaidError } from "plaid";

/**
 * Exchanges a public token for an access token using the Plaid client.
 *
 * @param publicToken - The public token to be exchanged.
 * @returns A promise resolving to the response from the token exchange.
 * @throws Error if the token exchange fails
 */
export const exchangePublicToken = async (publicToken: string) => {
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return response;
  } catch (error) {
    // Handle Plaid API errors
    if (error instanceof Error) {
      throw new Error(`Plaid token exchange failed: ${error.message}`);
    }
    // Handle PlaidError type if it's a Plaid-specific error
    if (typeof error === "object" && error !== null && "error_code" in error) {
      const plaidError = error as PlaidError;
      throw new Error(
        `Plaid API error: ${plaidError.error_code} - ${plaidError.error_message || "Unknown error"}`
      );
    }
    throw new Error("Unknown error occurred during token exchange");
  }
};
