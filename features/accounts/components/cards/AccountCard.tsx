import { Account, HouseholdMember } from "@/drizzle/schema";
import { FaAirbnb } from "react-icons/fa";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

interface AccountCardProps {
  account: Account;
  member: HouseholdMember | null;
}

const AccountCard = ({ account, member }: AccountCardProps) => {
  return (
    <div
      key={account.accountId}
      className="p-2 px-4 rounded-[12px] grid grid-cols-3 mb-4 border border-tertiary-200 hover:shadow-lg transition duration-500 ease-in-out w-full items-center"
    >
      <div className="flex flex-col bg-gradient-to-r from-primary-500 to-primary-800 rounded-full items-center justify-center text-white h-12 w-12 p-3">
        <FaAirbnb size={100} />
      </div>

      <div className="flex flex-col justify-center">
        <div className="font-medium text-[0.9rem] text-tertiary-1000">
          {account.accountName}
        </div>
        {member && (
          <div className="text-[0.75rem] text-tertiary-600">
            {member.fullName}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end font-semibold text-tertiary-1000 pr-4">
        {convertToMoney(Number(account.currentBalance))}
      </div>
    </div>
  );
};

export default AccountCard;
