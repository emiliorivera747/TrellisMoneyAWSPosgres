
import React from 'react';

//actions
import { signOut } from '@/app/actions/actions';

export default function SignOutButton() {

  return (
    <form action={signOut}>
      <button className="signout-button p-2 px-4 bg-zinc-200 font-semibold rounded-md" type="submit">
        {/* {isLoading ? "Signing out..." : "Sign Out"} */}
        Sign Out
      </button>
    </form >
  );
}
