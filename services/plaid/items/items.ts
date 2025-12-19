import { ItemRemoveRequest } from "plaid";
import { client } from "@/config/plaidClient";

/**
 * Removes an item from Plaid using the provided access token.
 *
 * @param accessToken - The access token associated with the item to be removed.
 * @returns A promise that resolves to the response from the Plaid API after the item is removed.
 */
export const removeItemFromPlaid = async (accessToken: string) => {
  if (!accessToken) throw new Error("Missing access token");

  try {
    await client.itemRemove({
      access_token: accessToken,
    });
    return true;
  } catch (error) {
    // Enhance error with context
    const plaidError = (error as any)?.response?.data || error;

    // If the item is already gone from Plaid, don't block the DB deletion
    if (
      plaidError.error_code === "ITEM_NOT_FOUND" ||
      plaidError.error_code === "INVALID_ACCESS_TOKEN"
    ) {
      console.warn(
        "Item already removed from Plaid or token invalid. Proceeding with DB cleanup."
      );
      return true;
    }

    console.error("Plaid itemRemove failed:", plaidError);
    throw new Error(plaidError.error_message || "Plaid communication failed");
  }
};
