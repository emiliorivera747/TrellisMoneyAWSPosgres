import { createClient } from "@/utils/supabase/server";


/**
 * Gets the user from Supabase
 * 
 * @returns 
 * 
 */
export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
