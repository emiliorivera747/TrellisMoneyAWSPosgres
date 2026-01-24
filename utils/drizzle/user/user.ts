import { db } from "@/drizzle/db";
import { eq, or } from "drizzle-orm";
import { user } from "@/drizzle/schema";

/**
 * Fetches a user by email.
 *
 * @param email - User's email.
 * @returns User object or `null` if not found.
 */
export const getUserByEmail = async (email: string) => {
  const userDB = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  return userDB[0] ?? null;
};

/**
 * Updates the `customerId` for a user.
 *
 * @param userId - User's unique ID.
 * @param customerId - New `customerId` value.
 * @returns Updated user object or `null` if not found.
 */
export const updateCustomerId = async (userId: string, customerId: string) => {
  
  const userDB = await db
    .update(user)
    .set({
      customerId,
    })
    .where(eq(user.userId, userId))
    .returning();

  return userDB[0]?? null;
};

/**
 * Fetches a user by customer ID.
 *
 * @param customerId - Customer's unique ID.
 * @returns User object or `null` if not found.
 */
export const getUserByCustomerId = async (customerId: string) => {

  const userDB = await db
    .select()
    .from(user)
    .where(eq(user.customerId, customerId))
    .limit(1);

  return userDB[0] ?? null;
};

/**
 * Fetches a user by their unique user ID.
 *
 * @param userId - The user's unique ID.
 * @returns User object or `null` if not found.
 */
export const getUserById = async (userId: string) => {

  const userDB = await db
    .select()
    .from(user)
    .where(eq(user.userId, userId))
    .limit(1);

  return userDB[0] ?? null;
};

/**
 * Creates a new user in the database.
 *
 * @param userData - Object containing email and user_id for the new user.
 * @returns The created user object if successful, otherwise `null`.
 *
 * @remarks
 * This function uses Drizzle's insert method to create a new user record.
 * The userId from Supabase auth is used as the primary key.
 */
export const createUser = async ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  const newUser = await db
    .insert(user)
    .values({
      email,
      userId,
    })
    .returning();

  return newUser[0] ?? null;
};

/**
 * Creates a new user in the database with full details.
 *
 * @param userData - Object containing user details.
 * @returns The created user object if successful, otherwise `null`.
 */
export const createUserWithDetails = async ({
  email,
  userId,
  fullName,
  emailVerified,
  phone,
  phoneVerified,
}: {
  email: string;
  userId: string;
  fullName?: string | null;
  emailVerified?: boolean;
  phone?: string | null;
  phoneVerified?: boolean;
}) => {
  const newUser = await db
    .insert(user)
    .values({
      email,
      userId,
      fullName: fullName ?? null,
      emailVerified: emailVerified ?? false,
      phone: phone ?? null,
      phoneVerified: phoneVerified ?? false,
    })
    .returning();

  return newUser[0] ?? null;
};

/**
 * Find a user by email or user ID.
 *
 * @param email - The email to search for.
 * @param userId - The user ID to search for.
 * @returns The user object if found, otherwise `null`.
 */
export const getUserByEmailOrId = async (email: string, userId: string) => {
  const userDB = await db
    .select()
    .from(user)
    .where(or(eq(user.email, email), eq(user.userId, userId)))
    .limit(1);

  return userDB[0] ?? null;
};

/**
 * Get all users from the database.
 *
 * @returns An array of all users.
 */
export const getAllUsers = async () => {
  const users = await db.select().from(user);
  return users;
};

/**
 * Update a user's details by email.
 *
 * @param email - The email of the user to update.
 * @param data - The data to update.
 * @returns The updated user object if successful, otherwise `null`.
 */
export const updateUserByEmail = async (
  email: string,
  data: {
    fullName?: string;
    userId?: string;
  }
) => {
  const updatedUser = await db
    .update(user)
    .set({
      fullName: data.fullName,
      userId: data.userId,
    })
    .where(eq(user.email, email))
    .returning();

  return updatedUser[0] ?? null;
};

/**
 * Delete a user by user ID.
 *
 * @param userId - The user ID to delete.
 * @returns The deleted user object if successful, otherwise `null`.
 */
export const deleteUserById = async (userId: string) => {
  const deletedUser = await db
    .delete(user)
    .where(eq(user.userId, userId))
    .returning();

  return deletedUser[0] ?? null;
};
