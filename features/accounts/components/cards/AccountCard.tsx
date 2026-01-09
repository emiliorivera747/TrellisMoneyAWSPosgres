import { Account } from "@/types/services/plaid/plaid";
import { FaAirbnb } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ModalHeader from "@/components/headers/ModalHeader";
import { transactions } from "@/features/accounts/utils/data/mockTransactionData";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import { useRemoveItem } from "@/hooks/react-query/items/useRemoveItem";

/**
 * Renders an account card with details and a modal for managing connections and viewing transactions.
 *
 * @param {Object} props - Component props.
 * @param {Account} props.account - Account details.
 *
 * @returns {JSX.Element} AccountCard component.
 *
 * @example
 * <AccountCard account={account} />
 */
const AccountCard = ({ account }: { account: Account }) => {
  const { mutateItem, itemIsPending, itemHasError, itemError } =
    useRemoveItem();
  if (itemIsPending) return <div>Loading...</div>;
  if (itemHasError)
    return <div>Error: {itemError?.message || "An error occurred"}</div>;

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        {" "}
        <div
          key={account.account_id}
          className="p-2 border rounded-[12px] grid grid-cols-3 mb-4  border-tertiary-200 hover:shadow-lg transition duration-500 ease-in-out  w-full"
        >
          <div className="flex flex-col w-[8rem] h-[4rem] bg-gradient-to-r from-primary-500 to-primary-800 rounded-[8px] items-center justify-center text-white py-1 pb-2">
            <span className="text-white text-[0.6rem] self-end pr-2">0000</span>
            <FaAirbnb size={100} />
          </div>
          <div className="flex items-center justify-start font-medium text-[0.9rem] text-tertiary-1000">
            {account.name}
          </div>
          <div className="flex items-center justify-end font-light text-tertiary-800 pr-4">
            {convertToMoney(Number(account.current))}
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[70vh] w-[60vw] overflow-scroll max-w-screen rounded-[12px]">
        <AlertDialogHeader>
          <ModalHeader title={account.name || ""} />

          <div className="">
            <div className="text-md font-semibold border-b border-tertiary-200 pb-4 mx-2 mb-4">
              {" "}
              Manage Connections
            </div>
            <div>
              <button
                className="px-4 py-4 border rounded-[12px]
              mb-4 ml-2 text-red-600 font-semibold hover:bg-tertiary-200"
                onClick={() => {
                  if (account.item_id) mutateItem(account.item_id);
                }}
              >
                Delete Connection
              </button>
            </div>
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

export default AccountCard;
