import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { client } from "@/config/plaidClient";
import { ItemGetResponse } from "plaid";
import { AxiosResponse } from "axios";

/**
 * Handles the POST request to exchange a public token for an access token
 * and store the item in the database.
 *
 * @param req - The incoming request object
 * @returns A JSON response with the access token or an error message
 */
export async function POST(req: NextRequest) {
  
  const {public_token, institution, accounts} = await req.json();
  
  const {institution_id} = institution;

  try {
    
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Look up items in the database to check if the institution is already connected
    const items = await prisma.item.findMany({
      where: {
        user_id: user?.id,
        institution_id,
      },
    });

    // If the institution is already connected, return an error
    if (items.length > 0) {
      return NextResponse.json(
        { error: "Institution already connected" },
        { status: 400 }
      );
    }

    // Check whether the accounts arleady exist in the database
    accounts.forEach(async (account: any) => {
      const existingAccount = await prisma.account.findFirst({
        where: {
          account_id: account.account_id,
          user_id: user?.id,
        },
      });

      // If the account already exists, return an error
      if (existingAccount) {
        return NextResponse.json(
          { error: "Account already exists" },
          { status: 400 }
        );
      }
    })

    // Exchange the public token for an access token
    const response = await client.itemPublicTokenExchange({ public_token });
    const { access_token } = response.data;

    // // Retrieve item details using the access token
    const item = await client.itemGet({ access_token });

    // Add the new item to the database
    const addItemResponse = await addItem(user?.id ?? "", item, access_token);

    // Return the access token if the item was added successfully
    if (addItemResponse) return NextResponse.json({ access_token });

    // Return an error if the item could not be added
    return NextResponse.json(
      { error: "Error adding item to database" },
      { status: 500 }
    );
  } catch (error) {
    // Handle errors during the token exchange process
    return NextResponse.json(
      { error: "Error exchanging public token" },
      { status: 500 }
    );
  }
}

/**
 * Adds the item to the database.
 *
 * @param user_id - The ID of the authenticated user
 * @param item - The item details retrieved from Plaid
 * @param access_token - The access token associated with the item
 * @returns The created item record or an error
 */
const addItem = async (
  user_id: string,
  item: AxiosResponse<ItemGetResponse, any>,
  access_token: string
) => {
  // Create a new item record in the database
  const res = prisma.item.create({
    data: {
      item_id: item.data.item.item_id,
      institution_id: item.data.item.institution_id || "",
      webhook: item.data.item.webhook || "",
      available_products: item.data.item.available_products,
      billed_products: item.data.item.billed_products,
      products: item.data.item.products,
      consented_products: item.data.item.consented_products,
      consent_expiration_time: item.data.item.consent_expiration_time || "",
      update_type: item.data.item.update_type,
      created_at: item.data.item.created_at,
      consented_use_cases: item.data.item.consented_use_cases,
      consented_data_scopes: item.data.item.consented_data_scopes,
      user_id: user_id,
      access_token,
      request_id: item.data.request_id,
    },
  });
  return res;
};
