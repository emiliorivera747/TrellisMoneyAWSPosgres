import MemberCards from "@/features/accounts/components/household/MemberCard";
import AddMemberCard from "@/features/accounts/components/household/AddMemberCard";
import { useFetchHouseholdMembers } from "@/features/accounts/hooks/useFetchHousehold";
import { useConnectionContext } from "@/features/accounts/context/ConnectionContext";
import MemberCardSkeleton from "@/features/accounts/components/skeleton/MemberCardSkeleton";

/**
 * A React functional component that represents the "Select Owner" step in a modal workflow.
 * This component fetches household members and displays them using the `MemberCard` component.
 * It also provides an option to add a new member using the `AddMemberCard` component.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - Utilizes the `useFetchHouseholdMembers` hook to fetch household data.
 * - Uses the `useConnectionContext` hook to navigate between routes.
 *
 * @dependencies
 * - `MemberCard`: A component to display household members.
 * - `AddMemberCard`: A component to add a new household member.
 *
 * @example
 * ```tsx
 * <SelectOwnerStep />
 * ```
 */
const SelectOwnerStep = () => {
  const { householdResponse, isLoadingHousehold, isErrorHousehold } =
    useFetchHouseholdMembers();
  const { goToRoute } = useConnectionContext();

  return (
    <div className="h-full gap-3 flex flex-col">
      {isLoadingHousehold ? (
        <MemberCardSkeleton length={6} />
      ) : (
        <MemberCards
          members={householdResponse?.data?.members}
          handleSetRoute={goToRoute}
        />
      )}
      <AddMemberCard handleSetRoute={goToRoute} />
    </div>
  );
};

export default SelectOwnerStep;
