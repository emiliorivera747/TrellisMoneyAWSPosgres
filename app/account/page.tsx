"use client";
import React, { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();

  const currentUser = supabase.auth.getUser();

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <p>{user?.email}</p>
        {/* <input id="email" type="text" value={user?.email} disabled /> */}
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        {/* <p>{displayName}</p> */}
        {/* <input
          id="fullName"
          type="text"
          value={displayName || ""}
        //   onChange={(e) => setDi(e.target.value)}
        /> */}
      </div>
      {/* <div>
        <button
          className="button primary block"
        //   onClick={() =>
        //     updateProfile({ fullname, username, website, avatar_url })
        //   }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div> */}

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
