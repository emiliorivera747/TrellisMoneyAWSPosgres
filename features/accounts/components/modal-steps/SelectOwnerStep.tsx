import MemberCard from "@/features/accounts/components/household/MemberCard";
import AddMemberCard from "@/features/accounts/components/household/AddMemberCard";

// Component for selecting the owner step in the modal
const SelectOwnerStep = () => {
    return (
        <div className="h-full gap-3 flex flex-col">
            {/* Render the MemberCard component with the provided members */}
            <MemberCard members={members} />
            {/* Render the AddMemberCard component with the handleSetRoute function */}
            <AddMemberCard handleSetRoute={handleSetRoute} />
        </div>
    );
};

export default SelectOwnerStep;
