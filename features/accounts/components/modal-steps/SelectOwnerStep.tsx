import MemberCards from "@/features/accounts/components/household/MemberCard";
import AddMemberCard from "@/features/accounts/components/household/AddMemberCard";
import { useFetchHouseholdMembers } from "@/features/accounts/hooks/useFetchHousehold";
import MemberCardSkeleton from "@/features/accounts/components/skeleton/MemberCardSkeleton";

/**
 * Displays the "Select Owner" step in a modal, showing household members and an option to add new ones.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - Fetches household data using `useFetchHouseholdMembers`.
 * - Includes `MemberCard` for displaying members and `AddMemberCard` for adding new ones.
 *
 * @example
 * ```tsx
 * <SelectOwnerStep />
 * ```
 */
const SelectOwnerStep = () => {
  const { householdResponse, isLoadingHousehold, isErrorHousehold } =
    useFetchHouseholdMembers();

  return (
    <div className="h-full gap-3 flex flex-col">
      {isLoadingHousehold ? (
        <MemberCardSkeleton length={6} />
      ) : (
        <MemberCards members={householdResponse?.data?.members} />
      )}
      <AddMemberCard />
    </div>
  );
};

export default SelectOwnerStep;
