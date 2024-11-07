"use client"

//Next and React
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// External libraries
import { toast } from "react-toastify";
import { z } from "zod";

// Firebase
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Components
import InputLabel from "@/components/form-components/InputLabel";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";

//Functions
import { getFirebaseErrorMessage } from "@/functions/firebaseErrorMessages";

type Inputs = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: async (data) => {
      try {
        schema.parse(data);
        return { values: data, errors: {} };
      } catch (e) {
        return { values: {}, errors: e.errors };
      }
    },
  });

  const [err, setErr] = useState<string | null>(null);

  const handleEmailSignUp: SubmitHandler<Inputs> = async (data) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      toast.success("Signed up successfully!", { theme: "colored" });
      router.push('/');
    } catch (err: any) {
      
      setErr(getFirebaseErrorMessage(err));
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up successfully!", {
        theme: "colored",
      });
      router.push('/dashboard');
    } catch (err) {
      setErr((err as any).message);
      toast.error((err as any).message);
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
      <div className="flex justify-center items-center h-[5rem] w-full ">
        <hr className="w-full border-t border-gray-300" />
        <p className="text-gray-500 text-sm px-4 font-medium">Or</p>
        <hr className="w-full border-t border-gray-300" />
      </div>
      {err && <PrimaryErrorMessage errMsg={err} />}
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
