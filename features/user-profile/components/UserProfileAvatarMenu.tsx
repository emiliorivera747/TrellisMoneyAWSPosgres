import React from "react";

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

import { profileHoverCardConfig } from "../config/profileHoverCardConfig";

const UserProfileAvatarMenu = () => {
  const { user } = useFetchUser();
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Avatar>
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-primary-600">
            {user?.email ? user.email[0].toUpperCase() : "D"}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="backdrop-blur bg-tertiary-300/40  text-tertiary-900 text-sm"
      >
        <div className="flex flex-col">
          {profileHoverCardConfig.map(({ url, label }, index) => {
            return (
              <Link
                href={`${url}/${user?.user_metadata?.id}`}
                key={index}
                className="hover:font-medium hover:bg-tertiary-300 px-2 py-2 rounded-md block transition-all ease-in-out duration-300 w-full "
              >
                {label}
              </Link>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserProfileAvatarMenu;
