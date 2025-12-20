"use client";
import { useState, useRef, useEffect } from "react";

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
import plaidService from "@/services/plaid/plaidServices";

// Types
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

// Config
import { Step } from "@/features/accounts/types/household";
import { getSteps } from "@/features/accounts/config/ModalSteps";

// Components
import PrimaryModalButton from "@/components/buttons/PrimaryModalButton";
import MemberCardSkeleton from "@/features/accounts/components/skeleton/MemberCardSkeleton";

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

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const { open, ready, error } = usePlaidLink({
    token: linkToken ?? null,
    onSuccess: async (
      publicToken: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      await plaidService.exchangeToken({
        public_token: publicToken,
        institution: metadata?.institution ?? { institution_id: "", name: "" },
        accounts: metadata.accounts || [],
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
            <DialogHeader className="border-b border-tertiary-300  flex ustify-between h-[3rem] ">
              <DialogTitle className="pl-4 text-md font-semibold text-tertiary-900">
                {currentStep.title}
              </DialogTitle>
            </DialogHeader>
            {/* Content */}
            <div className=" h-[20rem] px-4 overflow-scroll">
              {currentStep.description && (
                <DialogDescription className="flex items-center pb-4">
                  {currentStep.description}
                </DialogDescription>
              )}
              {isLoadingHousehold ? (
                <MemberCardSkeleton
                  length={householdResponse?.data?.members?.length || 6}
                />
              ) : (
                currentStep.content
              )}
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
                  ref={nextButtonRef}
                />
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddConnection;
