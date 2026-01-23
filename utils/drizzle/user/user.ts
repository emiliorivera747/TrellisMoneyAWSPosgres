import { db } from "@/drizzle/db";
import { eq, or } from "drizzle-orm";
import { user } from "@/drizzle/schema";

/**
 * Retrieves a user from the database by their email address.
 *
 * @param email - The email address of the user to retrieve.
 * @returns The user object if found, or `null` if no user exists with the given email.
 *
 * @remarks
 * This function uses Prisma's `findUnique` method to query the database.
 * Ensure that the `prisma` instance is properly initialized and connected to the database.
 *
 * @throws Will propagate any errors thrown by the Prisma client during the query.
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
 * Updates the `customer_id` field for a user in the database.
 *
 * @param userId - The unique identifier of the user whose `customer_id` needs to be updated.
 * @param customerId - The new `customer_id` value to be assigned to the user.
 * @returns The updated user object if the operation is successful.
 *          Returns `null` if the user could not be updated.
 *
 * @throws Will throw an error if the `prisma.user.update` operation fails.
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
 * Retrieves a user from the database based on the provided customer ID.
 *
 * @param customerId - The unique identifier for the customer.
 * @returns The user object if found, otherwise `null`.
 *
 * @remarks
 * This function uses Prisma's `findUnique` method to query the database.
 * Ensure that the `customer_id` field in the database is unique to avoid unexpected results.
 *
 * @throws This function does not handle database connection errors or other exceptions.
 * Ensure proper error handling is implemented where this function is called.
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
 * Retrieves a user from the database by their unique user ID.
 *
 * @param user_id - The unique identifier of the user to retrieve.
 * @returns The user object if found, otherwise `null`.
 *
 * @remarks
 * This function uses Prisma's `findUnique` method to fetch the user
 * based on the provided `user_id`. If no user is found, it returns `null`.
 * Note: The current implementation always returns `null`, which may need
 * to be updated to return the actual user object when found.
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
