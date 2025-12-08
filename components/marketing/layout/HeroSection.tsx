// components/layout/HeroSection.tsx
import React from "react";
import Link from "next/link";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

export default function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <header className="flex h-[90vh] flex-col items-center justify-center text-center">
      <div className=" -translate-y-[20%] sm:-translate-y-[20%] sm:w-[90%] flex flex-col justify-center items-center">
        <h1 className="bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-[2rem]  text-transparent sm:text-[3.2rem] tracking-wide font-bold ">
          See the bigger picture
        </h1>
        <p className="mt-2 mb-3 bg-gradient-to-r from-tertiary-800 to-tertiary-600 bg-clip-text text-[0.9rem] text-transparent sm:text-[1.2rem]">
          Take control of your finances with Trellis Money
        </p>
        {isAuthenticated ? <AuthenticatedCTA /> : <UnauthenticatedCTA />}
      </div>
    </header>
  );
}

function AuthenticatedCTA() {
  return (
    <Link
      href="/dashboard"
      className="mt-4 block border-none bg-gradient-to-r from-primary-900 to-primary-700 px-8 py-4 text-white transition duration-600 ease-in-out hover:from-primary-800 hover:to-primary-600 w-[20rem] rounded-[12px] hover:font-medium "
    >
      Go to Dashboard
    </Link>
  );
}

function UnauthenticatedCTA() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Link
        style={{
          boxShadow: `rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px`,
        }}
        href="/sign-up"
        className="flex h-[3.5rem] items-center justify-center rounded-[12px] bg-gradient-to-r  hover:to-tertiary-100 hover:from-tertiary-100 px-[4rem] py-[1.05882rem] transition duration-300 font-semibold text-tertiary-800 border-none border-tertiary-300"
      >
        Enjoy 30 days free
      </Link>
      <p className="mt-2 pt-4 text-[0.8rem] text-tertiary-700 w-[14rem] font-light">
        $5 a month after 30 days.
      </p>
      <p className="text-[0.8rem] text-tertiary-700 w-[14rem] font-light">
        Cancel anytime.
      </p>
    </div>
  );
}
