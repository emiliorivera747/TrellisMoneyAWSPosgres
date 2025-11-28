"use client";
import React, { useState } from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Hooks
import useGenerateToken from "@/hooks/plaid/useGenerateToken";
import { useMultistepForm } from "@/hooks/forms/useMultistepForm";
import { usePlaidLink } from "react-plaid-link";
import { useFetchHouseholdMembers } from "@/features/accounts/hooks/useFetchHousehold";

/**
 *
 * Responsible for adding a connection to plaid
 *
 * @returns
 */
const AddConnection = () => {
  const linkToken = useGenerateToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { householdResponse, isLoadingHousehold, isErrorHousehold } =
    useFetchHouseholdMembers({ isDialogOpen });

  const steps = [
    {
      title: "Select Account Owner",
      description: "Who owns this account?",
      content: (
        <div key={1} className="">
          {householdResponse?.data?.members.map(
            ({
              head_of_household_id,
              name,
            }: {
              head_of_household_id: string;
              name: string;
            }) => {
              return <div key={head_of_household_id}> {name}</div>;
            }
          )}
        </div>
      ),
    },
  ];

  const { currentStep, isFirstStep, isLastStep, back, next } =
    useMultistepForm(steps);

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
    <div className=" w-[18rem] flex flex-col rounded-[12px] bg-white h-[10rem] my-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <span className="w-full h-4 bg-tertiary-300 text-tertiary-900 py-4 px-6 rounded-[12px]">
            Add Account
          </span>
        </DialogTrigger>
        <DialogContent className="p-0 pt-4 pb-6 rounded-[12px]">
          <DialogHeader className="border-b border-tertiary-300  flex ustify-between h-[3rem] ">
            <DialogTitle className="pl-4 text-md font-light text-tertiary-900">
              {currentStep.title}
            </DialogTitle>
          </DialogHeader>
          {/* Content */}
          <div className=" h-[20rem] px-4 overflow-scroll">
            {currentStep.description && (
              <DialogDescription className="flex items-center pb-2">
                {currentStep.description}
              </DialogDescription>
            )}
            {currentStep.content}
          </div>
          {/* Footer */}
          <DialogFooter className="mt-4 flex sm:justify-between px-4 h-[3.2rem] transition-transform transform duration-500 ease-in-out">
            {!isFirstStep && (
              <button
                className="px-4 py-2 bg-gray-200 rounded-[12px]"
                onClick={() => back()}
              >
                Previous
              </button>
            )}
            <div className="flex justify-end w-full">
              <button
                className="px-4 py-2 bg-primary-700 text-white rounded-[12px]"
                onClick={() => next()}
              >
                Next
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddConnection;
