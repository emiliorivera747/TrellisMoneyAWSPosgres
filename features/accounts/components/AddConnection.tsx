"use client";
import React, { useState, useRef } from "react";

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

// Services
import plaidService from "@/features/plaid/services/plaidServices";

// Types
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

// Config
import { getSteps, Step } from "@/features/accounts/config/ModalSteps";

// Components
import PrimaryModalButton from "@/components/buttons/PrimaryModalButton";

/**
 *
 * Responsible for adding a connection to plaid
 *
 */
const AddConnection = () => {
  const linkToken = useGenerateToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { householdResponse, isLoadingHousehold, isErrorHousehold } =
    useFetchHouseholdMembers({ isDialogOpen });

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const steps: Step[] = getSteps({ householdResponse });

  const { currentStep, isFirstStep, isLastStep, back, next } =
    useMultistepForm(steps);

  const { open, ready, error } = usePlaidLink({
    token: linkToken,
    onSuccess: async (
      publicToken: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      const institutionName =
        metadata.institution?.name || "Unknown Institution";
      await plaidService.exchangeToken(
        JSON.stringify({
          public_token: publicToken,
          institution: {
            institution_id: metadata.institution?.institution_id,
            name: institutionName,
          },
          accounts: metadata.accounts || [],
        })
      );
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
              <PrimaryModalButton
                className="px-4 py-2 bg-gray-200 rounded-[12px]"
                onClickFn={() => back()}
                label="Previous"
                ref={prevButtonRef}
              />
            )}
            <div className="flex justify-end w-full">
              <PrimaryModalButton
                className="px-4 py-2 bg-primary-800 rounded-[12px]"
                onClickFn={() => next()}
                label="Next"
                ref={prevButtonRef}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddConnection;
