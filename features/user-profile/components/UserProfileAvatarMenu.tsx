import React, { useRef } from "react";

// Next Js
import Link from "next/link";

// Shadcn UI
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useFetchUser from "@/utils/hooks/user/useFetchUser";

import { getProfileHoverCardConfig } from "@/features/user-profile/config/profileHoverCardConfig";
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";

const UserProfileAvatarMenu = () => {
  const { user } = useFetchUser();
  const signOutButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar>
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-tertiary-800">
            {user?.email ? user.email[0].toUpperCase() : "D"}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="backdrop-blur bg-tertiary-300/40  text-tertiary-900 text-sm"
      >
        <div className="flex flex-col">
          <div className="border-b border-tertiary-400 mx-2 mb-2">
            <h1 className="text-sm pb-1">Membership status</h1>
            <p className="text-tertiary-900 font-bold text-md pb-4">
              Trellis Money {`Premium`}
            </p>
          </div>
          {getProfileHoverCardConfig(user?.id ? user.id : "").map(
            ({ url, label }, index) => {
              return (
                <Link
                  href={`${url}`}
                  key={index}
                  className=" hover:bg-tertiary-300 px-2 py-2 rounded-md block transition-all ease-in-out duration-300 w-full "
                >
                  {label}
                </Link>
              );
            }
          )}
          <SignOutButton
            ref={signOutButtonRef}
            className="hover:bg-tertiary-300 px-2 py-2 rounded-md block transition-all ease-in-out duration-300 w-full border-none items-start flex justify-start text-left"
          />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserProfileAvatarMenu;
