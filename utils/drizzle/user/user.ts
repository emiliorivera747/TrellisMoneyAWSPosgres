import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
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
