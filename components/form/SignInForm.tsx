import React from "react";

//External libraries
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Next
import Link from "next/link";
import Image from "next/image";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "../buttons/PrimarySubmitButton";

// Firebase
import {auth, googleProvider} from "@/lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleSignIn = (data: any) => {
    // Handle sign in logic here
    console.log(data);
  };
  return (
    <div className="flex flex-col w-full max-w-md bg-white p-8 rounded-lg">


      {/*  Sign in form */}
      <form
        onSubmit={handleSubmit(handleSignIn)}
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

      {/* Or */}
      <div className="flex justify-center items-center h-[5rem] w-full ">
        <hr className="w-full border-t border-gray-300" />
        <p className="text-gray-500 text-sm px-4 font-medium">Or</p>
        <hr className="w-full border-t border-gray-300" />
      </div>


      {/* Sign Up with google or create account */}
      <button onClick={handleGoogleSignIn} className="mb-4 px-[.94118rem] py-[1.05882rem] rounded-[12px] w-full text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-[#f1f3f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4">
        <div className="flex-shrink-0">
          <Image
            src="/google_logo.png"
            width={20}
            height={20}
            alt="google logo"
          />
        </div>
        Sign in with Google
      </button>
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
