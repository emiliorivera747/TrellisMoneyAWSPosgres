import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Filter from "@/components/dashboard/Filter";
import { GraphFilterButtonWithModalProps } from "@/types/components/admin/graphs/filters";
import { SlidersHorizontal, X } from "lucide-react";

const GraphFilterButtonWithModal = ({
  filterConfig,
  label = "Filters",
  innerRef,
  className,
}: GraphFilterButtonWithModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          <SlidersHorizontal className="size-5" strokeWidth={1.5} />
          {label}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-6 border-b border-tertiary-400 pb-4 flex justify-between items-center">
            {label}
            <AlertDialogCancel className="border-none shadow-none rounded-full p-3 flex items-center justify-center">
              <X className="size-8" strokeWidth={1.8} />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <Filter filterConfig={filterConfig} className={className} innerRef={innerRef} />
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-6">
          <AlertDialogAction className="bg-tertiary-1000 py-6 rounded-[12px]">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GraphFilterButtonWithModal;
