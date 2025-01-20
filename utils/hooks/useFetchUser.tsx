import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import {User} from "@supabase/supabase-js";

const client = createClient();

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await client.auth.getUser();
      if (error) {
        setError(error);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  return { user, error };
};

export default useFetchUser;
