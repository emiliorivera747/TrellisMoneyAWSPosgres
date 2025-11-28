import React from "react";

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

export const getSteps = ({ householdResponse }: StepProps) => [
    {
        title: "Select Account Owner",
        description: "Who owns this account?",
        content: (
            <div key={1} className="">
                {householdResponse?.data?.members.map(
                    (
                        { head_of_household_id, name }: Member,
                        index: number
                    ) => {
                        return (
                            <div key={`${head_of_household_id}-${index}`}>
                                {name}
                            </div>
                        );
                    }
                )}
            </div>
        ),
    },
];