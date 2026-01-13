import { db } from "@/drizzle/db";
import { item } from "@/drizzle/schema";

interface AddItemProps {
  user_id: string;
  member_id: string;
  item_id: string;
  access_token: string;
  household_id: string;
  request_id: string;
  institution_id?: string;
  institution_name?: string;
}

/**
 * Adds the item to the database.
 *
 * @param user_id - The ID of the authenticated user
 * @param member_id - The ID of the household member
 * @param household_id - The ID of the household
 * @param item_id - The Plaid item ID
 * @param access_token - The access token associated with the item
 * @param request_id - The Plaid request ID
 * @param institution_id - Optional institution ID from metadata
 * @param institution_name - Optional institution name from metadata
 * @returns The created item record or an error
 */
export const addItem = async ({
  user_id,
  member_id,
  household_id,
  item_id,
  access_token,
  request_id,
  institution_id,
  institution_name,
}: AddItemProps) => {
  const res = await db
    .insert(item)
    .values({
      itemId: item_id,
      userId: user_id,
      memberId: member_id,
      householdId: household_id,
      requestId: request_id,
      accessToken: access_token,
      institutionId: institution_id ?? null,
      institutionName: institution_name ?? null,
      // updateType and consentExpirationTime will be updated later via updateItemsWithPlaidItems
    })
    .returning();

  return res[0];
};
