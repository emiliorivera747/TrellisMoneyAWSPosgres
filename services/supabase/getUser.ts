import { createClient } from "@/utils/supabase/server";


/**
 * Gets the user from Supabase
 * 
 * @returns the user
 * 
 */
export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
