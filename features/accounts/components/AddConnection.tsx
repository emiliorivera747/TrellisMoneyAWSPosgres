"use client";

// Components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Components
import DialogHeader from "@/features/accounts/components/headers/DialogHeader";
import PrimaryDialogSection from "@/features/accounts/components/dialog/PrimaryDialogSection";
import AddAccount from "@/features/accounts/components/buttons/AddAccount";
import ConnectionError from "@/features/accounts/components/errors/ConnectionError";

// Context
import { useConnectionContext } from "@/features/accounts/context/ConnectionContext";

/**
 *
 * Responsible for adding a connection to plaid
 *
 */
const AddConnection = () => {
  const { isDialogOpen, error, setIsDialogOpen, currentStep } =
    useConnectionContext();

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
            <PrimaryDialogSection currentStep={currentStep} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddConnection;
