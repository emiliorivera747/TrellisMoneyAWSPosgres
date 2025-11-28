import React from "react";

// Components
import MemberCard from "@/features/accounts/components/household/MemberCard";

// Types 
import { StepProps, Step } from "@/features/accounts/types/household";

export const getSteps = ({ householdResponse }: StepProps): Step[] => [
  {
    title: "Select Account Owner",
    description: "Who owns this account?",
    content: <MemberCard householdResponse={householdResponse} />,
  },
];
