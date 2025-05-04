import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { client } from "@/config/plaidClient";
import { Products, CountryCode } from "plaid";

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
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const linkTokenResponse = await getLinkTokenRepsponse(user?.id!);

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
