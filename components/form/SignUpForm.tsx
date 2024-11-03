"use client";
import Image from "next/image";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [err, setErr] = useState<string | null>(null);

  const handleEmailSignUp: SubmitHandler<Inputs> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User signed up:", userCredential.user);
    } catch (err) {
      setErr((err as any).message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed up with Google:", result.user);
    } catch (err) {
      console.error("Error during Google sign-up:", err);
      setErr((err as any).message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg ">
      {/* Sign Up form*/}
      <form onSubmit={handleSubmit(handleEmailSignUp)} className="space-y-6">
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
        />
        <PrimarySubmitButton
          bgColor="bg-blue-500"
          textColor="text-white"
          hoverBgColor="hover:bg-blue-600"
          text="Sign Up"
        />
      </form>

      {/* OR section */}
      <div className="flex justify-center items-center h-[5rem] w-full ">
        <hr className="w-full border-t border-gray-300" />
        <p className="text-gray-500 text-sm px-4 font-medium">Or</p>
        <hr className="w-full border-t border-gray-300" />
      </div>

      {/* Sign up with google button */}
      <button
        onClick={handleGoogleSignUp}
        className="mb-4 px-[.94118rem] py-[1.05882rem] rounded-[12px] w-full text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-[#f1f3f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4"
      >
        <div className="flex-shrink-0">
          <Image
            src="/google_logo.png"
            width={20}
            height={20}
            alt="google logo"
          />
        </div>
        Sign up with Google
      </button>
    </div>
  );
}
