import { Member, MemberCardProp } from "@/features/accounts/types/household";
import { HouseholdMember } from "@/drizzle/schema"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConnectionContext } from "@/features/manage-connections/context/ConnectionContext";

/**
 * Renders a list of household members as clickable cards.
 * Each card shows the member's avatar and name, triggering a callback on click.
 *
 * @param {MemberCardProp} props - Contains members data.
 * @returns {JSX.Element | null} List of member cards or null if no members.
 */
const MemberCards = ({ members }: MemberCardProp) => {
  const { close, start } = useConnectionContext();

  if (!members) return null;

  const handleSelectingMember = (id: string | null | undefined) => {
    if (id) start(id);
    close();
  };

  return (
    <div key={1} className="flex flex-col gap-3">
      {members.map(
        ({ name, url, user_id, member_id }: Member, index: number) => {
          let id = user_id ? user_id : member_id;
          return (
            <div
              key={`${user_id}-${index}`}
              className="flex flex-row gap-4 items-center border rounded-[12px] px-4 py-[1rem] hover:bg-tertiary-200 font-light cursor-pointer"
              onClick={() => handleSelectingMember(member_id)}
            >
              <Avatar>
                <AvatarImage src={url ? url : ""} />
                <AvatarFallback
                  className={`${
                    index % 2 === 0 ? "bg-primary-800" : "bg-secondary-800"
                  } text-white`}
                >
                  {name ? name[0].toUpperCase() : "D"}
                </AvatarFallback>
              </Avatar>
              <div key={`${user_id}-${index}`}>{name}</div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default MemberCards;
