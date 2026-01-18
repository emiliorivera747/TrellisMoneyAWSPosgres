import { db } from "@/drizzle/db";
import { householdMember } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { CreateMemberProps } from "@/types/utils/drizzle/household-member/members";

/**
 * Retrieves a list of household members associated with the household ID
 * of the given user ID.
 *
 * @param userId - The ID of the user whose household members are to be retrieved.
 * @returns A promise that resolves to an array of household members.
 */
export const getMembersWithUserId = async (userId: string) => {
  return db
    .select()
    .from(householdMember)
    .where(
      inArray(
        householdMember.householdId,
        db
          .select({ householdId: householdMember.householdId })
          .from(householdMember)
          .where(eq(householdMember.userId, userId))
      )
    );
};

/**
 * Retrieves a household member by their user ID.
 *
 * @param userId - The unique identifier of the user.
 * @returns A promise that resolves to the household member object, or undefined if not found.
 */
export const getMemberByUserId = async (userId: string) => {
  const member = await db
    .select()
    .from(householdMember)
    .where(eq(householdMember.userId, userId))
    .limit(1);
  return member[0];
};

/**
 * Creates a new household member in the database.
 *
 * @param {Object} params - The parameters for creating a member.
 * @param {string} params.fullName - The full name of the member.
 * @param {string} params.email - The email address of the member.
 * @param {string} params.householdId - The ID of the household the member belongs to.
 * @returns {Promise<any>} A promise that resolves to the created member.
 */
export const createMember = async ({
  fullName,
  email,
  householdId,
}: CreateMemberProps) => {
  const member = await db.insert(householdMember).values({
    householdMemberId: crypto.randomUUID(),
    fullName,
    email,
    householdId,
  });
  return member;
};
