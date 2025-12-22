import { AddMemberProps } from "@/features/accounts/types/household";
import { Avatar,  } from "@/components/ui/avatar";

// AddMemberCard component renders a card UI for adding a new household member.
// It accepts `householdResponse` and `clickFn` as props from StepProps.
const AddMemberCard = ({
  handleSetRoute,
}: AddMemberProps) => {
  return (
    <div className="flex flex-row gap-4 items-center border rounded-[12px] px-4 py-[1rem] hover:bg-tertiary-200 font-light cursor-pointer">
      {/* Avatar component displays an icon for adding a new member */}
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
      {/* Text label for the Add Member action */}
      Add member
    </div>
  );
};

export default AddMemberCard;
