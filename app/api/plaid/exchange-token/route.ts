import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { client } from "@/config/plaidClient";
import { ItemGetResponse } from "plaid";
import { AxiosResponse } from "axios";
import { withAuth } from "@/lib/protected";

// Utils
import { getItemByUserAndInstitutionId } from "@/utils/prisma/item/getItem";
import { apiFail } from "@/utils/api-helpers/api-responses/response";

/**
 * Handles the POST request to exchange a public token for an access token
 * and store the item in the database.
 *
 * @param req - The incoming request object
 * @returns A JSON response with the access token or an error message
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    const { public_token, institution, accounts, user_id } =
      await request.json();

    const { institution_id } = institution;

    try {
      const itemDB = await getItemByUserAndInstitutionId(
        user_id,
        institution_id
      );

      if (itemDB)
        return apiFail(
          "Item already exists for this user and institution",
          400
        );

      // ----- Exchange the public token for an access token -----
      const response = await client.itemPublicTokenExchange({ public_token });
      const { access_token } = response.data;

      // ----- Retrieve item details using the access token -----
      const item = await client.itemGet({ access_token });

      // ------ Add the new item to the database ------
      const addItemResponse = await addItem(user?.id ?? "", item, access_token);

      // ----- Match the accounts to the item -----
      const addAccountResponse = await addAccounts(
        user?.id ?? "",
        item.data.item.item_id,
        accounts
      );

      // ----- Return the access token if the item was added successfully -----
      if (addItemResponse && addAccountResponse)
        return NextResponse.json({ access_token });

      // ----- Return an error if the item could not be added -----
      return NextResponse.json(
        { error: "Error adding item to database" },
        { status: 500 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an Error exchanging public token";
      // ----- Handle errors during the token exchange process -----
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  });
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

/**
 * Adds accounts to the database for the given item.
 *
 * @param item_id - The ID of the item
 * @param accounts - The accounts to be added
 * @returns The added accounts
 */
const addAccounts = async (
  user_id: string,
  item_id: string,
  accounts: any[]
) => {
  const addedAccounts = [];

  for (const account of accounts) {
    const createdAccount = await prisma.account.create({
      data: {
        user: {
          connect: {
            user_id,
          },
        },
        item: {
          connect: {
            item_id: item_id,
          },
        },
        account_id: account.id,
        name: account.name,
        mask: account.mask || null,
        type: account.type,
        subtype: account.subtype,
        verification_status: account.verification_status || null,
      },
    });

    addedAccounts.push(createdAccount);
  }

  return addedAccounts;
};
