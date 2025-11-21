import { prisma } from "@/lib/prisma";
import { fetchAllSupabaseUsers } from "@/utils/api-helpers/fetchAllSupabaseUsers";

/**
 * Syncs users between Supabase and the database
 * Optimized to batch operations and avoid N+1 queries
 */
export async function syncUsers() {
  const supabaseUsers = await fetchAllSupabaseUsers();
  const existingUsers = await prisma.user.findMany();

  // Create sets for O(1) lookup performance
  const supabaseUserIds = new Set(supabaseUsers.map((user) => user.id));
  const existingUserIds = new Set(existingUsers.map((user) => user.user_id));

  // Find users to delete (exist in DB but not in Supabase)
  const usersToDelete = existingUsers
    .filter((existingUser) => !supabaseUserIds.has(existingUser.user_id))
    .map((user) => user.user_id);

  // Find users to create (exist in Supabase but not in DB)
  const usersToCreate = supabaseUsers
    .filter((supabaseUser) => !existingUserIds.has(supabaseUser.id))
    .map((user) => ({
      email: user.email || "none",
      user_id: user.id,
    }));

  // Execute batch operations
  const operations = [];

  if (usersToDelete.length > 0) {
    operations.push(
      prisma.user.deleteMany({
        where: { user_id: { in: usersToDelete } },
      })
    );
  }

  if (usersToCreate.length > 0) {
    operations.push(
      prisma.user.createMany({
        data: usersToCreate,
        skipDuplicates: true,
      })
    );
  }

  if (operations.length > 0) {
    await prisma.$transaction(operations);
  }
}
