"use client";

// Next and React
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// External libraries
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import GoogleButton from "@/features/auth/components/buttons/GoogleButton";
import AlreadyHaveAccount from "@/features/auth/components/buttons/AlreadyHaveAccount";

// Hooks
import { useHandleEmailSignUp } from "@/features/auth/hooks/useHandleEmailSignUp";
import { useHandleGoogleSignUp } from "@/features/auth/hooks/useHandleGoogleSignUp";

// Schema
import { signUpSchema } from "@/features/auth/schemas/formSchemas";

//Services
import userService from "@/features/user/services/userService";

/**
 * Declared type for the inputs
 */
type Inputs = {
  email: string;
  password: string;
};

/**
 *
 * Sends a request to register the user
 *
 * @param user
 */
const registerUser = async (user: any) => {
  const body = {
    email: user?.user?.email,
    userId: user?.user?.uid,
    name: user?.user?.displayName ? user?.user?.displayName : user?.user?.email,
  };
  const payload = await userService.registerUser(body);
  return payload;
};

/**
 * If the user was successfully registered to firebase, then register the user to our database
 * Otherwise, return an error
 *
 * @param result
 * @returns true if successful, false if not
 */
const handleFirebaseResponse = async (result: any) => {
  if (result.success) {
    return await registerUser(result.user);
  } else {
    return { status: "error" };
  }
};

/**
 * Sign up form
 *
 * @returns JSX.Element
 */
export default function Signup() {
  const handleEmailSignUp = useHandleEmailSignUp();
  const handleGoogleSignUp = useHandleGoogleSignUp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const [err, setErr] = useState<string | null>(null);

  /**
   * If there is an error, set the error message
   * If the response is successful, redirect to the dashboard
   */
  const handleResponse = async (firebaseResponse: any, serverResponse: any) => {
    if (serverResponse.status === "error") {
      setErr(firebaseResponse.error);
    }
    if (serverResponse.status === "success") {
      reset();
      router.push("/dashboard");
    }
  };

  /**
   * Submit the email and password to firebase.
   * 1. If successful, register the user to our database
   * 2. If not, return an error
   * 3. Handle the response accordingly
   *
   * @param data
   */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const firebaseResponse = await handleEmailSignUp(data);
    const serverResponse = await handleFirebaseResponse(firebaseResponse);
    handleResponse(firebaseResponse, serverResponse);
  };

  /**
   * Sign In with google using firebase.
   * 1. If successful, register the user to our database
   * 2. If not, return an error
   * 3. Handle the response accordingly
   *
   * @param data
   */
  const handleGoogleSignupClick = async () => {
    const firebaseResponse = await handleGoogleSignUp();
    const serverResponse = await handleFirebaseResponse(firebaseResponse);
    handleResponse(firebaseResponse, serverResponse);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg ">
      {/* Sign Up form*/}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        />
      </form>

      {/* Already have and account? */}
      <AlreadyHaveAccount />

      {/* OR section */}
      <OrDivider />
      {err && <PrimaryErrorMessage errMsg={err} />}

      {/* Sign up with google button */}
      <GoogleButton
        handleFunction={handleGoogleSignupClick}
        label="Continue with Google"
      />
    </div>
  );
}
