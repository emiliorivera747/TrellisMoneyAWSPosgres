"use client";

// React & Next
import React, { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

//External libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Components
import PrimarySubmitButton from "../../../../components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import PasswordInput from "@/components/form-components/PasswordInput";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";
import PrimaryAuthContainer from "../containers/PrimaryAuthContainer";

//Schema
import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from "../../schemas/formSchemas";

// Functions
import { getSupabaseErrorMessage } from "@/utils/getSupabaseErrorMessages";
import { handleZodErrors } from "@/features/auth/utils/handleZodErrors";

//Server Actions
import { resetPassword, State } from "@/app/actions/actions";

const ResetPasswordForm = ({ code }: { code?: string | null }) => {
  const {
    register,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();

  const [state, formAction] = useActionState<State, FormData>(
    resetPassword,
    null
  );

  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {

    if (!state) return;

    handleZodErrors(state, setError);

    if (state.status === "error" && !Array.isArray(state.errors))
      setErr(getSupabaseErrorMessage(state.errors));

    if (state.status === "success") {
      toast.success("Successfully updated password!", { theme: "colored" });
      router.push("/dashboard");
    }
  }, [state, setError]);

  return (
    <PrimaryAuthContainer>
      <form
        action={formAction}
        className="flex flex-col gap-2"
      >
        <PrimaryAuthHeader label="Reset Password" />
        <div className="flex flex-col  mb-2">
          <input type="hidden" name="code" value={code || ""} />
          <PasswordInput
            fieldName="password"
            errors={errors}
            register={register}
            withPasswordTooltip={true}
          />
        </div>
        {err && <PrimaryErrorMessage errMsg={err} />}
        <PrimarySubmitButton text="Reset" />
      </form>
    </PrimaryAuthContainer>
  );
};

export default ResetPasswordForm;
