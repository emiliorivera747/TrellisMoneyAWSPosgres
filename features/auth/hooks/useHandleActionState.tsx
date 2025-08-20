import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UseFormSetError, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { State } from "@/types/serverActionState";

// Utility functions
import { getSupabaseErrorMessage } from "@/features/auth/utils/getSupabaseErrorMessages";
import { handleZodErrors } from "@/features/auth/utils/handleZodErrors";


/**
 * 
 * The hooks is used to handle the server actions
 * 
 * @param state 
 * @param setError 
 * @param onSuccessFn 
 * @param successMessage 
 * @returns 
 */
export function useHandleActionState<TFields extends FieldValues>(
  state: State,
  setError: UseFormSetError<TFields>,
  onSuccessFn?: () => void,
  successMessage?: string
) {
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    // Handle Zod validation errors
    handleZodErrors(state, setError);

    if (state.status === "error" && !Array.isArray(state.errors)) {
      if (
        state.errors &&
        typeof state.errors === "object" &&
        "code" in state.errors
      ) {
        setErr(getSupabaseErrorMessage(state.errors.code));
      } else {
        setErr(state.message);
      }
    }

    if (state.status === "success") {
      if (successMessage) toast.success(successMessage, { theme: "colored" });
      const stripePaymentLink = localStorage.getItem("stripePaymentLink");
      if (stripePaymentLink && state?.user?.email) {
        localStorage.removeItem("stripePaymentLink");
        router.push(
          stripePaymentLink + `?prefilled_email=${state?.user.email}`
        );
      } else {
        if (onSuccessFn) onSuccessFn();
      }
    }
  }, [state, setError]);

  return { err };
}
