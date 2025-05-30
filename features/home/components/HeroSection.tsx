// components/layout/HeroSection.tsx
import React from "react";
import Link from "next/link";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

export default function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <header className="flex h-[90vh] flex-col items-center justify-center text-center">
      <div className=" -translate-y-[40%] sm:-translate-y-[40%] sm:w-[90%]">
        <h1 className="bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-[2rem]  text-transparent sm:text-[3rem] tracking-wide font-bold ">
          See the bigger picture
        </h1>
        <p className="mt-2 mb-3 bg-gradient-to-r from-tertiary-800 to-tertiary-700 bg-clip-text text-[0.9rem] text-transparent sm:text-[1.2rem]">
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
      className="mt-4 block rounded border-none bg-gradient-to-r from-primary-900 to-primary-700 px-8 py-4 text-white transition duration-300 hover:from-primary-800 hover:to-primary-600"
    >
      Go to Dashboard
    </Link>
  );
}

function UnauthenticatedCTA() {
  return (
    <div className="mt-10 flex flex-col items-center ]">
      <Link
        href="/sign-up"
        className="flex h-[3.5rem] items-center justify-center rounded-full border-none bg-gradient-to-r from-[#d0ebff] to-[#a5d8ff] hover:from-[#a5d8ff] hover:to-[#74c0fc] px-[4rem] py-[1.05882rem]  transition duration-300  font-semibold text-tertiary-800"
      >
        Try for $0.00
      </Link>
      <p className="mt-2 pt-4 text-[0.8rem] text-tertiary-600 w-[14rem]">
        $5 a month after 30 days.
      </p>
      <p className=" text-[0.8rem] text-tertiary-600 w-[14rem]">
        Cancel anytime.
      </p>
    </div>
  );
}
