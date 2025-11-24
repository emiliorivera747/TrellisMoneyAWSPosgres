"use client";

import React from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Hooks
import useGenerateToken from "@/hooks/plaid/useGenerateToken";

import { usePlaidLink } from "react-plaid-link";

/**
 *
 * Responsible for adding a connection to plaid
 *
 * @returns
 */
const AddConnection = () => {
  const linkToken = useGenerateToken();

  const { open, ready, error } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken: string) => {
      // Exchange public_token for access_token
      await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken }),
      });
    },
    onExit: (err, metadata) => {
      console.log("Plaid exit:", err, metadata);
    },
    onEvent: (eventName, metadata) => {
      console.log("Plaid event:", eventName, metadata);
    },
  });

  if (error) return <p>Error loading Plaid: {error.message}</p>;

  return (
    <div className=" w-[18rem] flex flex-col rounded-[12px] bg-white h-[10rem]">
      <Dialog>
        <DialogTrigger>
          <span>{}</span>
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
