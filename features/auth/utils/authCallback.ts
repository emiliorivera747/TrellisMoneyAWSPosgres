import { prisma } from "@/lib/prisma";
import {SupabaseUserSyncData} from '@/features/auth/types/callback'
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

export const createHousehold = async (currentUser: SupabaseUserSyncData) => {
  const { id, email, user_metadata } = currentUser;
  const fullName = user_metadata.full_name?.trim();

  /**
   * Create household name
   */
  const householdName = fullName
    ? `${fullName}'s Household`
    : email
    ? `${email}'s Household`
    : "Our Household";

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

export const getHousehold = async (user_id: string) => {
  const householdExists = await prisma.householdMember.findFirst({
    where: { user_id },
    select: { household_id: true },
  });
  return householdExists;
};

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
  });

  return userDB;
};
