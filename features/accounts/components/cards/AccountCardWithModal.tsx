import { FaAirbnb } from "react-icons/fa";

// Components
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ModalHeader from "@/components/headers/ModalHeader";
import AccountCard from "@/features/accounts/components/cards/AccountCard";

// Utils
import { transactions } from "@/features/accounts/utils/data/mockTransactionData";

// Hooks
import { useRemoveItem } from "@/hooks/react-query/items/useRemoveItem";

// Types
import { Account, HouseholdMember } from "@/drizzle/schema";

interface AccountCardWithModalProps {
  account: Account;
  member: HouseholdMember | null;
}

/**
 * Renders an account card with details and a modal for managing connections and viewing transactions.
 *
 * @param {Object} props - Component props.
 * @param {Account} props.account - Account details.
 * @param {HouseholdMember | null} props.member - Associated household member.
 *
 * @returns {JSX.Element} AccountCard component.
 *
 * @example
 * <AccountCardWithModal account={account} member={member} />
 */
const AccountCardWithModal = ({
  account,
  member,
}: AccountCardWithModalProps) => {
  const { mutateItem, itemIsPending, itemHasError, itemError } =
    useRemoveItem();
  if (itemIsPending) return <div>Loading...</div>;
  if (itemHasError)
    return <div>Error: {itemError?.message || "An error occurred"}</div>;

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <AccountCard account={account} member={member} />
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[70vh] w-[60vw] overflow-scroll max-w-screen rounded-[12px]">
        <AlertDialogHeader>
          <ModalHeader title={account.accountName || ""} />
          <div className="">
            <div className="text-md font-semibold border-b border-tertiary-200 pb-4 mx-2 mb-4 ">
              {" "}
              Transactions
            </div>
            {transactions.map((transaction) => {
              return (
                <div
                  key={transaction.date.toString()}
                  className="grid grid-cols-3  border-tertiary-200 py-2 px-2 rounded-[12px] hover:bg-tertiary-100 duration-300 ease-in-out transition-all text-[0.8rem]"
                >
                  <span className="text-[0.8rem] font-semibold text-tertiary-1000 flex items-center">
                    {transaction.name}
                  </span>
                  <div className="w-full flex items-center justify-center text-[0.8rem]">
                    <span className=" px-4 text-[0.78rem] bg-primary-200 text-primary-1000 font-bold py-1 rounded-full flex items-center justify-center">
                      {transaction.category}
                    </span>
                  </div>
                  <span className="text-tertiary-700 text-[0.8rem] flex justify-end items-center">
                    {"$" + transaction.amount.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountCardWithModal;
