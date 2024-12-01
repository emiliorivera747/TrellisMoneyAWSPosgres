"use client";

// React & Next
import React, { useState, useActionState} from "react";
import Link from "next/link";

//External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//Compenents
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import TextInput from "@/components/form-components/TextInput";
import NavBar from "@/components/nav-bars/NavBar";
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";
import PrimaryAuthContainer from "@/features/auth/components/containers/PrimaryAuthContainer";

//Server Actions
import { confirmReset } from "../actions/actions";
import { State } from "@/types/serverActionState";

//Schema
import {
  loginHelpSchema,
  LoginHelpInputs,
} from "@/features/auth/schemas/formSchemas";

//Hooks
import { useHandleActionState } from "@/features/auth/hooks/useHandleActionState";

export default function PasswordReset() {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm<LoginHelpInputs>({
    resolver: zodResolver(loginHelpSchema),
  });

  const [message, setMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [state, formAction] = useActionState<State, FormData>(
    confirmReset,
    null
  );

  const onSuccessFn = () => {
    setEmailSent(true);
    setMessage("Email sent successfully!");
  };

  const { err } = useHandleActionState(
    state,
    setError,
    onSuccessFn,
    "Email sent successfully!"
  );

  return (
    <DashboardRedirect>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <PrimaryAuthContainer>
          {!emailSent && (
            <form action={formAction} className="flex flex-col gap-2 mb-2">
              <PrimaryAuthHeader label="Password Reset" />
              {message && <p style={{ color: "green" }}>{message}</p>}
              <div className="flex flex-col  mb-2">
                <TextInput
                  id="email"
                  fieldName="email"
                  type="email"
                  placeholder="Email"
                  errors={errors}
                  register={register}
                />
              </div>
              {err && (
                <p
                  style={{ color: "red" }}
                  className="text-red-500 text-sm mt-1 "
                >
                  {err}
                </p>
              )}
              <PrimarySubmitButton
                bgColor="bg-primary-700 "
                textColor="text-white"
                hoverBgColor="hover:bg-primary-900"
                text="Send Email"
              />
            </form>
          )}
          {emailSent && (
            <p className="text-secondary-900 text-md mb-6">
              Email sent successfully!
            </p>
          )}
          {emailSent && (
            <Link
              href="/sign-in"
              className="w-full px-[.94118rem] py-[1.05882rem] rounded-[12px] text-sm font-semibold text-gray-700 bg-[#e9ecef] shadow-sm hover:bg-[#dee2e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4 mb-4"
            >
              Return to Sign In
            </Link>
          )}
        </PrimaryAuthContainer>
      </div>
    </DashboardRedirect>
  );
}
