"use client";

import React from "react";

// Components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAccount from "@/features/accounts/components/buttons/AddAccount";

// Hooks
import useGenerateToken from "@/hooks/plaid/useGenerateToken";

/**
 *
 * Responsible for adding a connection to plaid
 *
 * @returns
 */
const AddConnection = () => {
  const linkToken = useGenerateToken();
  return (
    <div className=" w-[18rem] flex flex-col rounded-[12px] bg-white h-[10rem]">
      <Dialog>
        <DialogTrigger>
          <AddAccount />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Who is the owner of the account?</DialogTitle>
            <DialogDescription className="py-6">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddConnection;
