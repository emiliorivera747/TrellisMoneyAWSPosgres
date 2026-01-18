import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { householdMember } from "@/drizzle/schema";

/**
 * Fetches household member by user ID with household relations (accounts and items).
 *
 * @param userId - User's unique ID.
 * @returns Promise resolving to household member with household, accounts, and items, or null if not found.
 *
 * @example
 * const member = await getMemberByUserId("12345");
 * console.log(member?.household?.accounts);
 */
export const getMemberByUserId = async (userId: string) => {
  const member = await db.query.householdMember.findFirst({
    where: eq(householdMember.userId, userId),
  });
  return member;
};
