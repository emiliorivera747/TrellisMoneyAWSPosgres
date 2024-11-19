
import React from 'react';

//actions
import { signOut } from '@/app/actions/actions';

export default function SignOutButton() {

  return (
    <form action={signOut}>
      <button className="signout-button p-2 px-4 bg-tertiary-200  hover:bg-tertiary-400 rounded-md transition duration-300" type="submit">
        {/* {isLoading ? "Signing out..." : "Sign Out"} */}
        Sign Out
      </button>
    </form >
  );
}
