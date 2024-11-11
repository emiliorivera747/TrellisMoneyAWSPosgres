"use client";

// Next and React
import { useState } from "react";

// External libraries
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import GoogleButton from "@/components/buttons/GoogleButton";

// Hooks
import { useHandleEmailSignUp } from "@/hooks/useHandleEmailSignUp";
import { useHandleGoogleSignUp } from "@/hooks/useHandleGoogleSignUp";

// Schema
import { signUpSchema } from "@/lib/schemas/formSchemas";

//Services
import userService from "@/lib/features/user/userService";

type Inputs = {
  email: string;
  password: string;
};

export default function Signup() {
  const handleEmailSignUp = useHandleEmailSignUp();
  const handleGoogleSignUp = useHandleGoogleSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const [err, setErr] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await handleEmailSignUp(data);
    if (result.success) {
      const { user } = result;
      const body = {
        email: user?.user?.email,
        userId: user?.user?.uid,
        name: user?.user?.displayName? user?.user?.displayName: user?.user?.email,
      };
      const res = await userService.registerUser(body);
    }
    if (!result.success)
      setErr(
        result?.error
          ? result.error
          : "An error occurred. Please try again later."
      );
  };

  const handleGoogleSignupClick = async () => {
    const result = await handleGoogleSignUp();
    if (result.success) {
      const { user } = result;
      const body = {
        email: user?.user?.email,
        userId: user?.user?.uid,
        name: user?.user?.displayName? user?.user?.displayName: user?.user?.email,
      };
      const res = await userService.registerUser(body);
      console.log(res);
    }
    if (!result.success)
      setErr(
        result?.error
          ? result.error
          : "An error occurred. Please try again later."
      );
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

      {/* OR section */}
      <OrDivider />
      {err && <PrimaryErrorMessage errMsg={err} />}

      {/* Sign up with google button */}
      <GoogleButton
        handleFunction={handleGoogleSignupClick}
        label="Sign up with Google"
      />
    </div>
  );
}
