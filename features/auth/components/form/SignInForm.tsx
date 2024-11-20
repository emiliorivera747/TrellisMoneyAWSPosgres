"use client";
import React, { useState, useActionState, useEffect } from "react";

//External libraries
import { useForm, setError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";


// Next
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "../../../../components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import ForgotPassword from "@/features/auth/components/buttons/ForgotPasswordButton";
import GoogleButton from "@/features/auth/components/buttons/GoogleButton";

//Schema
import { signInSchema } from "@/features/auth/schemas/formSchemas";

// Server actions
import { login, State } from "@/app/actions/actions";

// Functions
import { getSupabaseErrorMessage } from "@/utils/getSupabaseErrorMessages";


type Inputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    reset,
    formState: { isValid, errors },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
  });

  // const handleEmailSignIn = useHandleEmailSignIn();
  // const handleGoogleSignIn = useHandleGoogleSignIn();
  const router = useRouter();

  const { pending } = useFormStatus();

  const [state, formAction] = useActionState<State, FormData>(login, null);

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
      toast.success("Signed in successfully!", { theme: "colored" });
      router.push("/dashboard");
    }
  }, [state, setError]);

  return (
    <div className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg">
      {/*  Sign in form */}
      <form action={formAction} className="flex flex-col gap-2">
        <h2 className="text-3xl text-[#495057] leading-6 tracking-[0.009em] mb-6 text-center font-semibold">
          Sign in
        </h2>
        <div className="flex flex-col  mb-2">
          <InputLabel
            type="email"
            id="email"
            placeholder="Email"
            errors={errors}
            register={register}
            name={"email"}
          />
          <InputLabel
            type="password"
            id="password1"
            placeholder="Password"
            errors={errors}
            register={register}
            name={"password"}
          />
        </div>
        <PrimarySubmitButton
          bgColor="bg-primary-700"
          textColor="text-white"
          hoverBgColor="hover:bg-primary-900"
          text="Sign In"
          disabled={!isValid || pending}
        />
      </form>

      {/* Forgot password */}
      <ForgotPassword />

      {/* Error message */}
      {err && <PrimaryErrorMessage errMsg={err} />}
      <OrDivider />

      {/* Sign Up with google or create account */}
      <GoogleButton
        label={"Continue with Google"}
      />

      <Link
        href="/sign-up"
        className="w-full px-[.94118rem] py-[1.05882rem] rounded-[12px] text-sm font-medium text-gray-700 bg-[#e9ecef] shadow-sm hover:bg-[#dee2e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4 mb-4"
      >
        <span>Create Account</span>
      </Link>
    </div>
  );
};

export default SignInForm;
