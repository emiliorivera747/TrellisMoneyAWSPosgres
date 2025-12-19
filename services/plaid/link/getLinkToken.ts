import { client } from "@/config/plaidClient";
import { Products, CountryCode } from "plaid";
/**
 * Generates a link token for Plaid Link
 * @param userId - The user ID
 * @returns {Promise<string>} - The link token
 */
const getLinkToken = async (userId: string) => {
  const linkTokenResponse = await client.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: "Trellis Money",
    products: [Products.Transactions, Products.Investments],
    country_codes: [CountryCode.Us],
    language: "en",
  });
  return linkTokenResponse.data.link_token;
};

export default getLinkToken;
