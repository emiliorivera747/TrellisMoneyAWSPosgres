import { Member, MemberCardProp } from "@/features/accounts/types/household";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * A functional component that renders a list of household members as clickable cards.
 * Each card displays the member's avatar and name, and triggers a callback function when clicked.
 *
 * @param {Object} props - The props object.
 * @param {HouseholdResponse} props.householdResponse - The response object containing household data.
 * @param {Function} [props.clickFn] - An optional callback function triggered when a member card is clicked.
 *
 * @typedef {Object} StepProps
 * @property {HouseholdResponse} householdResponse - The response object containing household data.
 * @property {Function} [clickFn] - An optional callback function triggered when a member card is clicked.
 *
 * @typedef {Object} HouseholdResponse
 * @property {Array<Member>} data.members - An array of household members.
 *
 * @typedef {Object} Member
 * @property {string} name - The name of the household member.
 * @property {string} url - The URL of the member's avatar image.
 * @property {string} user_id - The unique identifier for the household member.
 *
 * @returns {JSX.Element} A JSX element representing the list of household member cards.
 */
const MemberCard = ({ members, clickFn }: MemberCardProp) => {
  return (
    <div key={1} className="">
      {(members ?? []).map(
        (
          { name, url, user_id }: Member,
          index: number
        ) => {
          return (
            <div
              key={`${user_id}-${index}`}
              className="flex flex-row gap-4 items-center border rounded-[12px] px-4 py-[1rem] hover:bg-tertiary-200 font-light cursor-pointer"
              onClick={() => clickFn?.(user_id)}
            >
              <Avatar>
                <AvatarImage src={url ? url : ""} />
                <AvatarFallback className="bg-primary-800 text-white">
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

export default MemberCard;
