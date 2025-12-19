import { ItemRemoveRequest } from "plaid";
import { client } from "@/config/plaidClient";

/**
 * Removes an item from Plaid using the provided access token.
 *
 * @param accessToken - The access token associated with the item to be removed.
 * @returns A promise that resolves to the response from the Plaid API after the item is removed.
 */
export const removeItemFromPlaid = async (accessToken: string) => {
  if (!accessToken)
    throw new Error("Missing access token – cannot remove item from Plaid");

  const request: ItemRemoveRequest = {
    access_token: accessToken,
  };

  try {
    await client.itemRemove(request);
    console.log(`Successfully removed item from Plaid (token ending ...${accessToken.slice(-6)})`);
  } catch (error) {
    // Enhance error with context
    const plaidError = (error as any)?.response?.data || error;
    
    console.error("Plaid itemRemove failed:", {
      message:
        plaidError.error_message ||
        (error instanceof Error ? error.message : "Unknown error"),
      code: plaidError.error_code,
      accessTokenLast6: accessToken.slice(-6),
    });

    throw new Error(
      plaidError.error_message ||
        "Failed to remove item from Plaid. Please try again later."
    );
  }
};
