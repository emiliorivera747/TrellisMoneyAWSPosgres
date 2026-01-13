import { db } from "@/drizzle/db";
import { householdMember } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { CreateMemberProps } from "@/types/utils/drizzle/household-member/members";

export const getMembersWithUserId = async (userId: string) => {
  const members = await db
    .select()
    .from(householdMember)
    .where(
      eq(
        householdMember.householdId,
        db
          .select({ householdId: householdMember.householdId })
          .from(householdMember)
          .where(eq(householdMember.userId, userId))
          .limit(1)
      )
    );

  return members;
};

export const getMemberByUserId = async (userId: string) => {
  const member = await db
    .select()
    .from(householdMember)
    .where(eq(householdMember.userId, userId))
    .limit(1);
  return member[0];
};

export const createMember = async ({
  name,
  email,
  householdId,
}: CreateMemberProps) => {
  const member = await db.insert(householdMember).values({
    memberId: crypto.randomUUID(),
    name,
    email,
    householdId,
  });
  return member;
};
