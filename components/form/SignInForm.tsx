"use client";
import { useState } from "react";

//External libraries
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Next
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "../buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import GoogleButton from "@/components/buttons/GoogleButton";
import ForgotPassword from "@/components/buttons/ForgotPasswordButton";

//Functions
import {handleEmailSignIn, handleGoogleSignIn} from "@/functions/sign-in/handleSignIn";

//Schema
import {signInSchema} from "@/lib/schemas/formSchemas";

type Inputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const [errMsg, setErrMsg] = useState<String | null>(null);

  const emailSignIn: SubmitHandler<Inputs> = async (data: Inputs) => {
    const error = await handleEmailSignIn(data, router);
    if (error) setErrMsg(error);
  };

  const googleSignIn = async () => {
    const error = await handleGoogleSignIn(router);
    if (error) setErrMsg(error);
  };

  return (
    <div className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg">
      {/*  Sign in form */}
      <form
        onSubmit={handleSubmit(emailSignIn)}
        className="flex flex-col gap-2"
      >
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
          bgColor="bg-blue-500"
          textColor="text-white"
          hoverBgColor="hover:bg-blue-600"
          text="Sign In"
        />
      </form>

      {/* Forgot password */}
      <ForgotPassword />

      {/* Error message */}
      {errMsg && <PrimaryErrorMessage errMsg={errMsg} />}
      <OrDivider />

      {/* Sign Up with google or create account */}
      <GoogleButton
        handleFunction={googleSignIn}
        label={"Sign in with Google"}
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
