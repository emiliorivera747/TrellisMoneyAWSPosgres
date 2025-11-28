import React from "react";
import { StepProps, Member } from "@/features/accounts/types/household";

const MemberCard = ({ householdResponse }: StepProps) => {
  return (
    <div key={1} className="">
      {householdResponse?.data?.members.map(
        ({ head_of_household_id, name }: Member, index: number) => {
          return <div key={`${head_of_household_id}-${index}`}>{name}</div>;
        }
      )}
    </div>
  );
};

export default MemberCard;
