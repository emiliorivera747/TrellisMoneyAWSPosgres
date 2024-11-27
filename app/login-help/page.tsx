"use client";

// React & Next
import React, { useState, useActionState, useEffect } from "react";
import Link from "next/link";

//External Libraries
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

//Compenents
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import TextInput from "@/components/form-components/TextInput";
import NavBar from "@/components/nav-bars/NavBar";
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";

//Server Actions
import { confirmReset, State } from "../actions/actions";

//Functions
import { getSupabaseErrorMessage } from "@/utils/getSupabaseErrorMessages";

const schema = z.object({
  email: z.string().email("Invalid email format"),
});

interface Input {
  email: string;
  password1: string;
}

export default function PasswordReset() {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [state, formAction] = useActionState<State, FormData>(
    confirmReset,
    null
  );
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
        state.errors.forEach((error: { path: string; message: string }) => {
          setError(error.path as "email", {
            message: error.message,
          });
        });
      } else {
        const supabaseError = getSupabaseErrorMessage(state.errors);
        setErr(supabaseError);
      }
    }
    if (state.status === "success") {
      toast.success("Signed in successfully!", { theme: "colored" });
      setEmailSent(true);
      setMessage("Email sent successfully!");
    }
  }, [state]);

  return (
    <DashboardRedirect>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <div className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg"> 
          {!emailSent && (
            <form action={formAction} className="flex flex-col gap-2 mb-2">
              <PrimaryAuthHeader label="Reset Your Password" />
              {message && <p style={{ color: "green" }}>{message}</p>}
              <TextInput
                id="email"
                fieldName="email"
                type="email"
                placeholder="Email"
                errors={errors}
                register={register}
              />
              <PrimarySubmitButton
                bgColor="bg-primary-700 "
                textColor="text-white"
                hoverBgColor="hover:bg-primary-900"
                text="Send Email"
              />
            </form>
          )}
          {emailSent && <p className='text-secondary-900 text-md mb-6'>Email sent successfully!</p>}
          {emailSent && (
            <Link
              href="/sign-in"
              className="w-full px-[.94118rem] py-[1.05882rem] rounded-[12px] text-sm font-semibold text-gray-700 bg-[#e9ecef] shadow-sm hover:bg-[#dee2e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4 mb-4"
            >
              Return to Sign In
            </Link>
          )}
          {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
      </div>
    </DashboardRedirect>
  );
}
