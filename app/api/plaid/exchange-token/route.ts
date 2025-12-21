import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { client } from "@/config/plaidClient";
import { ItemGetResponse } from "plaid";
import { AxiosResponse } from "axios";
import { withAuth } from "@/lib/protected";

// Utils
import { getItemsByUserAndInstitutionId } from "@/utils/prisma/item/getItem";

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
      /**
       *  Look up the items associated with the user and instiution.
       *
       *  A user have multiple items with the same in institution. Some
       *  examples are the following,
       *
       *    - Different Login:    User may have both a personal and business
       *                          login to institution
       *
       *    - Different Accounts: User may link checking account today and
       *                          savings tomorrow with same institution
       *                          resulting in two separate items.
       *
       *   Therefore, we will retrieve all of the items to perform performs
       *   checks before exchanging tokens.
       *
       */
      const currentItems = await getItemsByUserAndInstitutionId(
        user_id,
        institution_id
      );

      /**
       * If we have one item then we will keep the original
       * item if accounts match.
       */
      if (currentItems.length === 1) {
        const currentItem = currentItems[0];

        // Check if the accounts match
        const accountIds = accounts.map((account: any) => account.account_id);
        const existingAccountIds = currentItem.accounts.map(
          (account: any) => account.account_id
        );

        const accountsMatch = accountIds.every((id: string) =>
          existingAccountIds.includes(id)
        );

        if (accountsMatch) {
          return NextResponse.json(
            { message: "Accounts already linked with the institution" },
            { status: 200 }
          );
        }
      }

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
        // Add the mandatory 'connect' operation for the 'user' relation
        user: {
          connect: {
            user_id, // Connect the Account to the User with this ID
          },
        },

        // Add the mandatory 'connect' operation for the 'item' relation (if required by your schema)
        item: {
          connect: {
            item_id: item_id, // Connect the Account to the Item with this ID
          },
        },

        // Continue with other account data
        account_id: account.id,
        name: account.name,
        mask: account.mask || null,
        type: account.type,
        subtype: account.subtype,
        verification_status: account.verification_status || null,
        // class_type: account.class_type || null,
      },
    });

    addedAccounts.push(createdAccount);
  }

  return addedAccounts;
};
