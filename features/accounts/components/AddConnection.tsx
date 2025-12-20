"use client";
import { useState, useEffect } from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// Hooks
import useGenerateToken from "@/hooks/plaid/useGenerateToken";
import { useMultistepForm } from "@/hooks/forms/useMultistepForm";
import { usePlaidLink } from "react-plaid-link";
import { useFetchHouseholdMembers } from "@/features/accounts/hooks/useFetchHousehold";

// Services
import plaidService from "@/services/plaid/plaidServices";

// Types
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

// Config
import { Step } from "@/features/accounts/types/household";
import { getSteps } from "@/features/accounts/config/ModalSteps";

// Components
import DialogHeader from "@/features/accounts/components/headers/DialogHeader";
import PrimaryDialogSection from "@/features/accounts/components/dialog/PrimaryDialogSection";
import DialogFormNavigation from "@/features/accounts/components/dialog/DialogFormNavigation";

/**
 *
 * Responsible for adding a connection to plaid
 *
 */
const AddConnection = () => {
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { linkToken, generateToken } = useGenerateToken();

  const { householdResponse, isLoadingHousehold, isErrorHousehold } =
    useFetchHouseholdMembers({ isDialogOpen });

  const { open, ready, error } = usePlaidLink({
    token: linkToken ?? null,
    onSuccess: async (
      publicToken: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      await plaidService.exchangeToken({
        public_token: publicToken,
        metadata,
      });

      setSelectedUserId(null);
    },
    onExit: (err, metadata) => {
      console.log("Plaid exit:", err, metadata);
      setSelectedUserId(null);
    },
    onEvent: (eventName, metadata) => {
      console.log("Plaid event:", eventName, metadata);
    },
  });

  useEffect(() => {
    if (linkToken && ready && selectedUserId) open();
  }, [selectedUserId, linkToken, ready, open]);

  const handleSelectUser = async (userId: string) => {
    setIsDialogOpen(false);
    setSelectedUserId(userId);
    try {
      await generateToken(userId);
    } catch (error) {
      setSelectedUserId(null);
    }
  };

  const steps: Step[] = getSteps({
    householdResponse,
    clickFn: handleSelectUser,
  });

  const { currentStep, isFirstStep, isLastStep, back, next } =
    useMultistepForm(steps);

  if (error) return <p>Error loading Plaid: {error.message}</p>;

  return (
    <>
      <div className=" w-[18rem] flex flex-col rounded-[12px] bg-white h-[10rem] my-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <span className="flex items-center justify-center w-full h-[4rem] bg-tertiary-300 text-tertiary-900 py-4 px-6 rounded-[12px]">
              Add Account
            </span>
          </DialogTrigger>
          <DialogContent className="p-0 pt-4 pb-6 rounded-[12px]">
            <DialogHeader title={currentStep.title ?? "Untitled"} />

            <PrimaryDialogSection
              currentStep={currentStep}
              isLoadingHousehold={isLoadingHousehold}
              householdResponse={householdResponse}
            />

            <DialogFooter className="mt-4 flex sm:justify-between px-4 h-[3.2rem] transition-transform transform duration-500 ease-in-out">
              <DialogFormNavigation
                isFirstStep={isFirstStep}
                back={back}
                next={next}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddConnection;
