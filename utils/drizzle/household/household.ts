import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { householdMember } from "@/drizzle/schema";

// Types
import { Account } from "@/types/services/plaid/plaid";

// Utils
import { deepSnakeCase } from "@/utils/api-helpers/transformer/transformers";

/**
 * Fetches household member by user ID with household relations (accounts and items).
 *
 * @param user_id - User's unique ID.
 * @returns Promise resolving to household member with household, accounts, and items, or null if not found.
 *
 * @example
 * const member = await getMemberByUserId("12345");
 * console.log(member?.household?.accounts);
 */
export const getMemberByUserId = async (user_id: string) => {
  const member = await db.query.householdMember.findFirst({
    where: eq(householdMember.userId, user_id),
    with: {
      household: {
        with: {
          accounts: true,
          items: true,
        },
      },
    },
  });

  if (!member) return null;

  // Transform to snake_case format (remove all camelCase properties)
  return member;
};
