import { prisma } from "@/lib/prisma";
import { fetchAllSupabaseUsers } from "@/utils/api-helpers/fetchAllSupabaseUsers";

export async function syncUsers() {
  const supabaseUsers = await fetchAllSupabaseUsers();
  const existingUsers = await prisma.user.findMany();

  // If the user exists in our database but not in Supabase, we delete it
  for (const existingUser of existingUsers) {
    const supabaseUser = supabaseUsers.find(
      (user) => user.id === existingUser.user_id
    );

    if (!supabaseUser) {
      await prisma.user.delete({
        where: { user_id: existingUser.user_id },
      });
    }
  }

  
  // If the user doesn't exist in our database, we create it
  for (const supabaseUser of supabaseUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { user_id: supabaseUser.id },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: supabaseUser.email ? supabaseUser.email : "none",
          user_id: supabaseUser.id,
        },
      });
    } 
  }
}
