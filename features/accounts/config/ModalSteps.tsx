// Components
import MemberCard from "@/features/accounts/components/household/MemberCard";

// Types
import { StepProps, Step } from "@/features/accounts/types/household";
import { Avatar } from "@/components/ui/avatar";

export const getSteps = ({ householdResponse, clickFn }: StepProps): Step[] => [
  {
    title: "Select Account Owner",
    description: "Who owns this account?",
    content: (
      <div className="h-full gap-2 flex flex-col">
        <MemberCard householdResponse={householdResponse} clickFn={clickFn} />
        <div className="flex flex-row gap-4 items-center border rounded-[12px] px-4 py-[1rem] hover:bg-tertiary-200 font-light">
          <Avatar className="border border-tertiary-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-tertiary-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Avatar>
          Add member
        </div>
      </div>
    ),
  },
  {
    title: "Add a member",
    description: "",
    content: <div>Form</div>,
  },
];
