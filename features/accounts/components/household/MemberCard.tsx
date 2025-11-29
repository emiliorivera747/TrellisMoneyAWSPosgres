import React from "react";
import { StepProps, Member } from "@/features/accounts/types/household";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MemberCard = ({ householdResponse, clickFn }: StepProps) => {
  return (
    <div key={1} className="">
      {(householdResponse?.data?.members ?? []).map(
        (
          { name, url, user_id }: Member,
          index: number
        ) => {
          return (
            <div
              key={`${user_id}-${index}`}
              className="flex flex-row gap-4 items-center border rounded-[12px] px-4 py-[1rem] hover:bg-tertiary-200 font-light"
              onClick={() => clickFn?.(user_id)}
            >
              <Avatar>
                <AvatarImage src={url ? url : ""} />
                <AvatarFallback className="bg-primary-800 text-white">
                  {name ? name[0].toUpperCase() : "D"}
                </AvatarFallback>
              </Avatar>
              <div key={`${user_id}-${index}`}>{name}</div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default MemberCard;
