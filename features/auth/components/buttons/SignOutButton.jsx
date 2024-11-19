"use client";
import React, { useState } from "react";


//actions
import { signOut } from '@/app/actions/actions';

export default function SignOutButton() {

  return (
    <form action={signOut}>
      <button className="signout-button p-4 bg-zinc-300 font-bold rounded-md" type="submit">
        {/* {isLoading ? "Signing out..." : "Sign Out"} */}
        Sign Out
      </button>
    </form >
  );
}
