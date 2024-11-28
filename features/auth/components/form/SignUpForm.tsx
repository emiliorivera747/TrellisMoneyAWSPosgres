"use client";

// Next and React
import React, { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";

// External libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Components
import TextInput from "@/components/form-components/TextInput";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import AlreadyHaveAccount from "@/features/auth/components/buttons/AlreadyHaveAccount";
import EmailVerification from "@/features/auth/components/email-verification/EmailVerification";
import GoogleButton from "@/features/auth/components/buttons/GoogleButton";
import PasswordInput from "@/components/form-components/PasswordInput";
import PrimaryAuthContainer from "@/features/auth/components/containers/PrimaryAuthContainer";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";

// Schema
import { signUpSchema } from "@/features/auth/schemas/formSchemas";

//Functions
import { getSupabaseErrorMessage } from "@/utils/getSupabaseErrorMessages";

// Server actions
import { signUp, State } from "@/app/actions/actions";

/**
 * Declared type for the inputs
 */
type Inputs = {
  email: string;
  password: string;
};

/**
 * Sign up form
 *
 * @returns JSX.Element
 */
export default function Signup() {
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState<State, FormData>(signUp, null);
  const [email, setEmail] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const [err, setErr] = useState<string | null>(null);
  const [userSuccess, setUserSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!state) {
      return;
    }

    console.log("STATE: ", state);

    // In case our form action returns `error` we can now `setError`s
    if (state.status === "error") {
      console.log("ERRORS: ", state.errors);

      if (Array.isArray(state.errors)) {
        state.errors.forEach((error: { path: string; message: string }) => {
          setError(
            error.path as "email" | "password" | "root" | `root.${string}`,
            {
              message: error.message,
            }
          );
        });
      } else {
        const supabaseError = getSupabaseErrorMessage(state.errors);
        setErr(supabaseError);
      }
    }
    if (state.status === "success") {
      toast.success("Signed up successfully!", { theme: "colored" });
      setUserSuccess(true);
      setEmail(state.user.email);
    }
  }, [state, setError]);

  return (
    <PrimaryAuthContainer>
      {/* Sign Up form*/}
      {!userSuccess && (
        <form action={formAction} className="flex flex-col gap-2 w-[1/3]">
          <PrimaryAuthHeader label="Create Account" />
          <div className="flex flex-col  mb-2">
            <TextInput
              type="email"
              id="email1"
              fieldName="email"
              placeholder="Email"
              errors={errors}
              register={register}
            />
            {/* {isFocused && <PasswordTooltip password={password} />} */}
            <PasswordInput
              fieldName="password"
              errors={errors}
              register={register}
            />
          </div>
          <PrimarySubmitButton
            bgColor="bg-primary-700"
            textColor="text-white"
            hoverBgColor="hover:bg-primary-900"
            text="Create Account"
          />
          {pending && <span>Loading...</span>}
        </form>
      )}

      {/* Email verification */}
      {userSuccess && (
        <EmailVerification email={email ? email : "your email"} />
      )}

      {/* Already have and account? */}
      {!userSuccess && <AlreadyHaveAccount />}

      {/* OR section */}
      {!userSuccess && <OrDivider />}
      {err && <PrimaryErrorMessage errMsg={err} />}

      {/* Sign up with google button */}
      {!userSuccess && <GoogleButton label="Continue with Google" />}
    </PrimaryAuthContainer>
  );
}
