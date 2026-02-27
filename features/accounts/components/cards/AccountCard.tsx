import { Account, HouseholdMember } from "@/drizzle/schema";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

interface AccountCardProps {
  account: Account;
  member: HouseholdMember | null;
  logoUrl?: string;
}

function hashToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}

const AccountCard = ({ account, member, logoUrl }: AccountCardProps) => {
  const initials = account.accountName.trim().charAt(0).toUpperCase();
  const hue = hashToHue(account.itemId);
  const gradientStyle = {
    background: `linear-gradient(to right, hsl(${hue}, 65%, 45%), hsl(${(hue + 40) % 360}, 65%, 35%))`,
  };

  return (
    <div
      key={account.accountId}
      className="bg-white/5 backdrop-blur-md  p-4 px-4 rounded-[12px] grid grid-cols-3 mb-4 border border-tertiary-200 hover:shadow-lg transition duration-500 ease-in-out w-full items-center"
    >
      <div
        className="flex flex-col rounded-full items-center justify-center text-white h-12 w-12 overflow-hidden"
        style={logoUrl ? undefined : gradientStyle}
      >
        {logoUrl ? (
          <img src={logoUrl} alt={account.accountName} className="h-full w-full object-contain p-1" />
        ) : (
          <span className="text-lg font-semibold">{initials}</span>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div className="font-medium text-[0.9rem] text-tertiary-1000">
            {account.accountName.length > 20
            ? `${account.accountName.substring(0, 20).replace(/-/g, "")} - ${account.mask}`
            : `${account.accountName.replace(/-/g, " ")} - ${account.mask}`}
        </div>
        {member && (
          <div className="text-[0.9rem] text-tertiary-600">
            {member.fullName}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end font-medium text-tertiary-1000 pr-4">
        {convertToMoney(Number(account.currentBalance))}
      </div>
    </div>
  );
};

export default AccountCard;
