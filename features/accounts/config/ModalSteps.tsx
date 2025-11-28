import React from "react";

// Components
import MemberCard from "@/features/accounts/components/household/MemberCard";

interface Member {
  head_of_household_id: string;
  name: string;
}

interface StepProps {
  householdResponse: {
    data: {
      members: Member[];
    };
  };
}

export interface Step {
  title: string;
  description: string;
  content: JSX.Element;
}

export const getSteps = ({ householdResponse }: StepProps): Step[] => [
  {
    title: "Select Account Owner",
    description: "Who owns this account?",
    content: <MemberCard householdResponse={householdResponse} />,
  },
];
