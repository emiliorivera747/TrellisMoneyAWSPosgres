import React from "react";
import { StepProps, Member } from "@/features/accounts/types/household";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MemberCard = ({ householdResponse }: StepProps) => {
  return (
    <div key={1} className="">
      {householdResponse?.data?.members.map(
        ({ head_of_household_id, name, url }: Member, index: number) => {
          return (
            <div key={`${head_of_household_id}-${index}`} className="flex flex-row gap-4 items-center border rounded-[12px] px-4 py-[1rem] hover:bg-tertiary-200 font-light">
              <Avatar>
                <AvatarImage src={url ? url : ""} />
                <AvatarFallback className="bg-primary-800 text-white">
                  {name ? name[0].toUpperCase() : "D"}
                </AvatarFallback>
              </Avatar>
              <div key={`${head_of_household_id}-${index}`}>{name}</div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default MemberCard;
