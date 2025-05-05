import React from "react";

//actions
import { signOut } from "@/app/actions/actions";

import { cn } from "@/lib/utils";

export default function SignOutButton({
  ref,
  className,
}: {
  ref?: React.RefObject<HTMLButtonElement>;
  className?: string;
}) {
  const default_className =
    "signout-button p-2 px-4 border border-tertiary-900 text-tertiary-900  hover:bg-tertiary-400  transition duration-300 rounded-lg";
  return (
    <form action={signOut}>
      <button
        className={cn(default_className, className)}
        ref={ref}
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
}
