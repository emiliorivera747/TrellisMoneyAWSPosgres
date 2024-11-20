"use client";

// React & Next
import React, { useState } from "react";
import Link from "next/link";

//External Libraries
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


//Compenents
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import InputLabel from "@/components/form-components/InputLabel";
import NavBar from "@/components/nav-bars/NavBar";
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";

const schema = z.object({
  email: z.string().email("Invalid email format"),
});

type Input = {
  email: string;
};

export default function PasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Input> = async (data) => {
    setMessage(null);
    setErr(null);

    try {
      // await sendPasswordResetEmail(auth, data.email);
      setMessage("Password reset email sent! Check your inbox.");
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setErr(
        "Failed to send password reset email. Please check your email address and try again."
      );
    }
  };

  return (
    <DashboardRedirect>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <div className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mb-2"
          >
            <h2 className="text-3xl text-[#495057] leading-6 tracking-[0.009em] mb-6 text-center font-semibold">
              Reset Your Password
            </h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            <InputLabel
              id="email"
              name="email"
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
              disabled={false}
            />
          </form>
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
