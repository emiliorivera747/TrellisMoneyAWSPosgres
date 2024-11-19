"use client";

// Next and React
import React, { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

// External libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import AlreadyHaveAccount from "@/features/auth/components/buttons/AlreadyHaveAccount";

// Schema
import { signUpSchema } from "@/features/auth/schemas/formSchemas";

import { getSupabaseErrorMessage } from "@/utils/getSupabaseErrorMessages";

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
  // const handleEmailSignUp = useHandleEmailSignUp();
  // const handleGoogleSignUp = useHandleGoogleSignUp();
  const router = useRouter();

  const { pending } = useFormStatus();

  const [state, formAction] = useActionState<State, FormData>(signUp, null);

  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!state) {
      return;
    }

    // In case our form action returns `error` we can now `setError`s
    if (state.status === "error") {
      console.log(state.message);
      console.log(state.errors);
      if (Array.isArray(state.errors)) {
        state.errors.forEach((error: unknown) => {
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
      console.log(state.message);
      alert(state.message);
    }
  }, [state, setError]);

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg ">
      {/* Sign Up form*/}
      <form action={formAction} className="space-y-6">
        <h2 className="text-3xl text-[#495057] leading-6 tracking-[0.009em] mb-6 text-center font-semibold">
          Create Account
        </h2>
        <InputLabel
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          errors={errors}
          register={register}
        />
        <InputLabel
          type="password"
          id="password2"
          placeholder="Password"
          errors={errors}
          register={register}
          name="password"
          passwordTooltip={true}
        />

        <PrimarySubmitButton
          bgColor="bg-blue-500"
          textColor="text-white"
          hoverBgColor="hover:bg-blue-600"
          text="Sign Up"
          disabled={!isValid || pending}
        />
        {pending && <span>Loading...</span>}
      </form>

      {/* Already have and account? */}
      <AlreadyHaveAccount />

      {/* OR section */}
      <OrDivider />
      {err && <PrimaryErrorMessage errMsg={err} />}

      {/* Sign up with google button */}
      {/* <GoogleButton
        handleFunction={handleGoogleSignupClick}
        label="Continue with Google"
      /> */}
    </div>
  );
}
