"use client";

import { useEffect } from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// Hooks
import useGenerateToken from "@/hooks/plaid/useGenerateToken";
import { usePlaidLink } from "react-plaid-link";
import { useAddConnection } from "@/features/accounts/hooks/useAddConnection";

// Services
import plaidService from "@/services/plaid/plaidServices";

// Types
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

// Components
import DialogHeader from "@/features/accounts/components/headers/DialogHeader";
import PrimaryDialogSection from "@/features/accounts/components/dialog/PrimaryDialogSection";
import DialogFormNavigation from "@/features/accounts/components/dialog/DialogFormNavigation";
import AddAccount from "@/features/accounts/components/buttons/AddAccount";
import ConnectionError from "@/features/accounts/components/errors/ConnectionError";

/**
 *
 * Responsible for adding a connection to plaid
 *
 */
const AddConnection = () => {
  const { linkToken, generateToken } = useGenerateToken();

  const {
    isDialogOpen,
    setIsDialogOpen,
    currentStep,
    isLoadingHousehold,
    householdResponse,
    isFirstStep,
    back,
    next,
  } = useAddConnection({ generateToken });

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
    },
    onExit: (err, metadata) => {
      console.log("Plaid exit:", err, metadata);
    },
  });

  useEffect(() => {
    if (linkToken && ready) open();
  }, [linkToken, ready, open]);

  if (error) return <ConnectionError message={error.message} />;

  return (
    <>
      <div className=" w-[18rem] flex flex-col rounded-[12px] bg-white h-[10rem] my-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <AddAccount />
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
