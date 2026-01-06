"use client";

// Components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Components
import DialogHeader from "@/features/accounts/components/headers/DialogHeader";
import PrimaryDialogSection from "@/features/accounts/components/dialog/PrimaryDialogSection";
import ConnectionError from "@/features/accounts/components/errors/ConnectionError";

// Context
import { useConnectionContext } from "@/features/manage-connections/context/ConnectionContext";
import { ReactNode } from "react";

/**
 *
 * Responsible for adding a connection to plaid
 *
 */
const AddConnection = ({ children }: { children: ReactNode }) => {
  const { isDialogOpen, error, setIsDialogOpen, currentStep } =
    useConnectionContext();
  if (error) return <ConnectionError message={error.message} />;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 pt-4 pb-6 rounded-[12px]">
        <DialogHeader title={currentStep.title ?? "Untitled"} />
        <PrimaryDialogSection currentStep={currentStep} />
      </DialogContent>
    </Dialog>
  );
};

export default AddConnection;
