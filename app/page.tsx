// Next and React
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

// Components
import SignInButton from "@/features/auth/components/buttons/SignInButton";
import Footer from "@/components/footers/Footer";
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import PricingSection from "@/features/stripe/components/PricingSection";

import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trellis Money - Seeing value where others don't",
  description:
    "Trellis Money is a personal finance management tool. Track investments across all accounts. Set goals and budgets. Get insights into your spending.",
};

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-white h-screen">
      <nav className=" p-2 py-5 flex items-center justify-between sm:p-4 border-b border-gray-200 mx-10 sm:py-5">
        <div className="flex items-center">
          <span className="text-xl font-bold text-tertiary-1000">
            Trellis Money
          </span>
        </div>
        {user ? <SignOutButton /> : <SignInButton />}
      </nav>
      <header className="text-center h-full items-center justify-center flex flex-col">
        <div className="translate-y-[-70%] sm:translate-y-[-50%] mx-4 sm:w-[50rem]">
          <h1 className="text-[2rem] sm:text-[2.8rem] font-bold text-tertiary-900  bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-transparent">
            Seeing value where others don't
          </h1>
          <p className=" mt-2 mb-3 bg-gradient-to-r from-tertiary-700 to-tertiary-700 bg-clip-text text-transparent text-[0.9rem] sm:text-[1.1rem]">
            Take control of your finances with Trellis Money.
          </p>

          {user ? (
            <Link
              href="/dashboard"
              className="block mt-4 px-8 py-4 bg-gradient-to-r from-primary-900 to-primary-700 transition duration-300 text-white border-none rounded cursor-pointer"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-up"
                className=" inline-block  rounded-full mt-4 px-8 py-5  transition duration-300  bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-900 text-white border-none cursor-pointer font-bold"
              >
                Try for $0.00
              </Link>
              <p className="pt-4 text-tertiary-600 text-[0.8rem] mt-2">
                $4.99 a month after 30 days. Cancel anytime.
              </p>
            </>
          )}
        </div>
      </header>
      <PricingSection />
      <Footer />
    </div>
  );
}
