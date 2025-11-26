import { NextRequest, NextResponse } from "next/server";
import { client } from "@/config/plaidClient";
import { Products, CountryCode } from "plaid";
import { getUser } from "@/utils/api-helpers/supabase/getUser";

const ERROR_MESSAGES = {
  UNAUTHENTICATED: "User not authenticated",
  LINK_TOKEN_ERROR: "Error generating link token",
};

/**
 * POST /api/plaid/create-link-token
 * @param req - The request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    /**
     * Get the current user
     */
    const user = await getUser();

    /**
     * Unauthorized error
     */
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    /**
     * Get the user we want to get the linktoken for
     */
    const { user_id } = await req.json();

    const linkTokenResponse = await getLinkTokenRepsponse(user_id);

    return NextResponse.json(
      { link_token: linkTokenResponse },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.LINK_TOKEN_ERROR },
      { status: 500 }
    );
  }
}

/**
 * Generates a link token for Plaid Link
 * @param userId - The user ID
 * @returns {Promise<string>} - The link token
 */
const getLinkTokenRepsponse = async (userId: string) => {
  const linkTokenResponse = await client.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: "Trellis Money",
    products: [Products.Transactions, Products.Investments],
    country_codes: [CountryCode.Us],
    language: "en",
  });
  return linkTokenResponse.data.link_token;
};
