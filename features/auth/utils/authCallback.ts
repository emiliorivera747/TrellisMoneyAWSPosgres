// Drizzle
import { db } from "@/src/drizzle/db";
import { user, household, householdMember } from "@/src/drizzle/schema/";
import { eq } from "drizzle-orm";

// Utils
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { createHouseholdName } from "@/utils/helper-functions/formatting/createHouseholdName";

// Types
import { SupabaseUserSyncData } from "@/features/auth/types/callback";

/**
 * Adds or updates a user in the PostgreSQL database via Prisma.
 */
export async function upsertUser(currentUser: SupabaseUserSyncData) {
  try {
    console.log("Before Update");
    /**
     * Perform the upsert
     */
    const userDB = await updateOrCreateUser(currentUser);

    console.log("userDB", userDB);

    /**
     * Get the household
     */
    const doesHouseholdExistRes = await doesHouseholdExist(currentUser.id);
    console.log("doesHouseholdExistRes", doesHouseholdExistRes);

    /**
     * If the user does not exist then we will
     * create a new house and member.
     */
    if (!doesHouseholdExistRes) await createHousehold(currentUser);

    return userDB;
  } catch (err) {
    console.error(getServerErrorMessage(err), err);
    return null;
  }
}

/**
 * Creates a household and assigns the user as an admin member.
 *
 * @param currentUser - User data with ID, email, and metadata.
 *
 * Steps:
 * 1. Generate a household name from the user's full name or email.
 * 2. Create a household and add the user as an admin member.
 *
 * @throws Error if the database transaction fails.
 */
export const createHousehold = async (currentUser: SupabaseUserSyncData) => {
  const { id, email, user_metadata } = currentUser;
  const fullName = user_metadata.full_name?.trim();

  // await prisma.$transaction(async (tx) => {
  //   // 1. Create household (no created_by yet)
  //   const household = await tx.household.create({
  //     data: { name: createHouseholdName(fullName, email) },
  //   });

  //   // 2. Create admin member and connect both sides in one call
  //   const adminMember = await tx.householdMember.create({
  //     data: {
  //       name: user_metadata.full_name?.trim() || "Unknown",
  //       email: email ?? undefined,
  //       role: "ADMIN",
  //       user: { connect: { user_id: id } },
  //       household: { connect: { household_id: household.household_id } },
  //     },
  //   });
  //   // 3. Set the created_by field in the household
  //   await tx.household.update({
  //     where: { household_id: household.household_id },
  //     data: { created_by: { connect: { member_id: adminMember.member_id } } },
  //   });

  //   return household;
  // });

  await db.transaction(async (tx) => {
    /**
     * Create Household
     */
    const householdInsert = await tx
      .insert(household)
      .values({
        householdId: crypto.randomUUID(),
        name: createHouseholdName(fullName, email),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning({ householdId: household.householdId });

    console.log("householdInsert", householdInsert);
    const householdId = householdInsert[0].householdId;

    /**
     * Create Member
     */
    const memberInsert = await tx
      .insert(householdMember)
      .values({
        memberId: crypto.randomUUID(),
        name: user_metadata.full_name?.trim() || "Unknown",
        role: "ADMIN",
        userId: id,
        householdId,
      })
      .returning({ memberId: householdMember.memberId });
    const memberId = memberInsert[0]?.memberId;
    console.log("memeberInsert", memberInsert);

    /**
     * Update createBy field in household
     */
    await tx
      .update(household)
      .set({
        createdBy: memberId,
      })
      .where(eq(household.householdId, householdId));

    return householdInsert[0];
  });
};

/**
 * Retrieves the household ID for a given user ID.
 *
 * @param userId - The user's unique identifier.
 * @returns A promise resolving to the `household_id` or `null` if not found.
 */
export const doesHouseholdExist = async (userId: string) => {
  const exists = await db
    .select({ householdId: householdMember.householdId })
    .from(householdMember)
    .where(eq(householdMember.userId, userId))
    .limit(1);
  return exists;
};

/**
 * Upserts a user in the database.
 *
 * @param currentUser - User data including ID, email, and metadata.
 * @returns The user record after the upsert operation.
 *
 * Updates or creates a user based on `user_id`. Defaults email to an empty string
 * and name to "Unknown" if not provided.
 */
export const updateOrCreateUser = async (currentUser: SupabaseUserSyncData) => {
  // const userDB = await prisma.user.upsert({
  //   where: { user_id: currentUser.id },
  //   update: {
  //     email: currentUser.email ?? "",
  //     name: currentUser.user_metadata.full_name?.trim() || "Unknown",
  //   },
  //   create: {
  //     user_id: currentUser.id,
  //     email: currentUser.email ?? "",
  //     name: currentUser.user_metadata.full_name?.trim() || "Unknown",
  //   },
  //   include: {
  //     subscriptions: true,
  //   },
  // });
  // return userDB;

  const userId = currentUser.id;
  const email = currentUser.email ?? "";
  const name = currentUser.user_metadata?.full_name?.trim() || "Unknown";

  await db
    .insert(user)
    .values({
      userId,
      email,
      name,
    })
    .onConflictDoUpdate({
      target: user.userId,
      set: {
        email: currentUser.email ?? "",
        name: currentUser.user_metadata.full_name?.trim() || "Unknown",
        updatedAt: new Date().toISOString(),
      },
    });

  console.log("Insert values")
  const userWithSubs = await db.query.user.findFirst({
    where: eq(user.userId, userId),
    with: { subscriptions: true }, 
  });

  console.log("userWithSubs", userWithSubs);

  return userWithSubs;
};
