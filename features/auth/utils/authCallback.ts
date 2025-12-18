import { prisma } from "@/lib/prisma";
import { SupabaseUserSyncData } from "@/features/auth/types/callback";

/**
 * Determines the base redirect URL based on environment and headers.
 */
export function getRedirectBase(request: Request, origin: string): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) return origin;
  if (forwardedHost) return `https://${forwardedHost}`;
  return origin;
}

/**
 * Adds or updates a user in the PostgreSQL database via Prisma.
 */
export async function upsertUser(currentUser: SupabaseUserSyncData) {
  try {
    /**
     * Perform the upsert
     */
    const userDB = await updateOrCreateUser(currentUser);

    /**
     * Get the household
     */
    const household = await getHousehold(currentUser.id);

    /**
     * If the user does not exist then we will
     * create a new house and member.
     */
    if (!household) await createHousehold(currentUser);

    return userDB;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "There was an error updating user";
    console.error(
      "Prisma Upsert/Household Creation Failed:",
      errorMessage,
      err
    );
    return null;
  }
}

/**
 * Creates a household for the given user and assigns the user as an admin member of the household.
 *
 * @param currentUser - The user data containing the user's ID, email, and metadata.
 *
 * The function performs the following steps:
 * 1. Generates a household name based on the user's full name or email.
 * 2. Creates a new household in the database with the generated name.
 * 3. Adds the user as an admin member of the newly created household.
 *
 * @remarks
 * - If the user's full name is not available, the household name is derived from the user's email.
 * - The function uses a database transaction to ensure both the household and household member are created atomically.
 *
 * @throws Will throw an error if the database transaction fails.
 */
export const createHousehold = async (currentUser: SupabaseUserSyncData) => {
  const { id, email, user_metadata } = currentUser;
  const fullName = user_metadata.full_name?.trim();

  /**
   * Create household name
   */
  const householdName = fullName
    ? fullName.endsWith("s")
      ? `${fullName}' Household`
      : `${fullName}'s Household`
    : email?.split("@")[0] + "'s Household";

  await prisma.$transaction(async (tx) => {
    const household = await tx.household.create({
      data: {
        name: householdName,
      },
    });

    await tx.householdMember.create({
      data: {
        name: fullName ?? "Unknown",
        role: "ADMIN",
        user_id: id,
        household_id: household.household_id,
      },
    });
  });
};

/**
 * Retrieves the household information associated with a given user ID.
 *
 * This function queries the database to find the first household member
 * record that matches the provided user ID. If a matching record is found,
 * it returns the household ID associated with the user.
 *
 * @param user_id - The unique identifier of the user whose household information is being retrieved.
 * @returns A promise that resolves to an object containing the `household_id` if the user is part of a household,
 *          or `null` if no matching household member is found.
 *
 * @example
 * ```typescript
 * const household = await getHousehold("user123");
 * if (household) {
 *   console.log(household.household_id);
 * } else {
 *   console.log("No household found for this user.");
 * }
 * ```
 */
export const getHousehold = async (user_id: string) => {
  const householdExists = await prisma.householdMember.findFirst({
    where: { user_id },
    select: { household_id: true },
  });
  return householdExists;
};

/**
 * Updates an existing user or creates a new user in the database based on the provided user data.
 *
 * @param currentUser - The user data to synchronize with the database. This includes the user's ID, email,
 * and metadata such as the full name.
 *
 * @returns A promise that resolves to the user record in the database after the upsert operation.
 *
 * The function performs the following:
 * - If a user with the given `user_id` exists in the database, it updates the user's email and name.
 * - If no user with the given `user_id` exists, it creates a new user with the provided data.
 *
 * Notes:
 * - If `currentUser.email` is `null` or `undefined`, an empty string is used as the email.
 * - If `currentUser.user_metadata.full_name` is `null` or `undefined`, the name is set to "Unknown".
 */
export const updateOrCreateUser = async (currentUser: SupabaseUserSyncData) => {
  const userDB = await prisma.user.upsert({
    where: { user_id: currentUser.id },
    update: {
      email: currentUser.email ?? "",
      name: currentUser.user_metadata.full_name?.trim() || "Unknown",
    },
    create: {
      user_id: currentUser.id,
      email: currentUser.email ?? "",
      name: currentUser.user_metadata.full_name?.trim() || "Unknown",
    },
    include: {
      subscriptions: true,
    },
  });
  return userDB;
};


