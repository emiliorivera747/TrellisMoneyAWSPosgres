import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";

/**
 * Handles the POST request to create a new item in the database.
 *
 * This function expects a JSON payload in the request body containing an `item` object
 * with various properties. It uses Prisma to create a new record in the `item` table
 * with the provided data. If any property is missing, it defaults to an empty string.
 *
 * @param req - The incoming HTTP request object of type `NextRequest`.
 * @returns A JSON response containing a success message and the created item object,
 *          or an error message with a 500 status code in case of failure.
 *
 * Example usage:
 * ```json
 * POST /api/plaid/items
 * {
 *   "item": {
 *     "item_id": "123",
 *     "institution_id": "456",
 *     "available_products": ["transactions"],
 *     "billed_products": ["auth"],
 *     "products": ["identity"],
 *     "error": null,
 *     "user_id": "user_789",
 *     "access_token": "access-token-abc",
 *     "update_type": "background",
 *     "consent_expiration_time": "2023-12-31T23:59:59Z",
 *     "institution_name": "Bank Name",
 *     "webhook": "https://example.com/webhook",
 *     "auth_method": "oauth",
 *     "consented_products": ["transactions"],
 *     "consented_data_scopes": ["read"],
 *     "consented_use_cases": ["personal_finance"],
 *     "request_id": "req_123"
 *   }
 * }
 * ```
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      const body = await request.json();
      const tempItem = body.item;

      // Create the item
      const item = await prisma.item.create({
        data: {
          item_id: tempItem.item_id || '',
          institution_id: tempItem.institution_id || '',
          available_products: tempItem.available_products || '',
          billed_products: tempItem.billed_products || '',
          products: tempItem.products || '',
          error: tempItem.error || '',
          user_id: user?.id || '', // Use the authenticated user's ID
          access_token: tempItem.access_token || '',
          update_type: tempItem.update_type || '',
          consent_expiration_time: tempItem.consent_expiration_time || '',
          institution_name: tempItem.institution_name || '',
          webhook: tempItem.webhook || '',
          auth_method: tempItem.auth_method || '',
          consented_products: tempItem.consented_products || '',
          consented_data_scopes: tempItem.consented_data_scopes || '',
          consented_use_cases: tempItem.consented_use_cases || '',
          request_id: tempItem.request_id || '',
        },
      });

      return NextResponse.json({ message: "Hello, World!", item: item });
    } catch (error) {
      return NextResponse.json({ error: (error as any).message }, { status: 500 });
    }
  });
}
