import React from "react";

import { Account } from "@/types/plaid";

import { FaAirbnb } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ModalHeader from "@/components/headers/ModalHeader";

const AccountCard = ({ account }: { account: Account }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        {" "}
        <div
          key={account.account_id}
          className="border rounded-[12px] grid grid-cols-3 mb-4  border-tertiary-200 hover:shadow-lg transition duration-500 ease-in-out p-3 w-full"
        >
          <div className="flex flex-col w-[8rem] h-[4rem] bg-gradient-to-r from-primary-500 to-primary-800 rounded-[8px] items-center justify-center text-white py-1 pb-2">
            <span className="text-white text-[0.6rem] self-end pr-2">0000</span>
            <FaAirbnb size={100} />
          </div>
          <div className="flex items-center justify-start font-medium text-[0.9rem] text-tertiary-1000">
            {account.name}
          </div>
          <div className="flex items-center justify-end font-light text-tertiary-800 pr-4">
            {account?.balance?.current
              ? "$" + Number(account.balance.current).toFixed(2)
              : "$0.00"}
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[70vh] w-[60vw] overflow-scroll max-w-screen rounded-[12px]">
        <AlertDialogHeader>
          <ModalHeader title={account.name} />
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountCard;
