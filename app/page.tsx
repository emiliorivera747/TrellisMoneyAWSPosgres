// Next and React
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

// Components
import SignInButton from "@/features/auth/components/buttons/SignInButton";
import Footer from "@/components/footers/Footer";
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-white h-screen">
      <nav className="flex items-center justify-between p-4 border-b border-gray-200 mx-10 py-5">
        <div className="flex items-center">
          <span className="text-xl font-bold text-tertiary-1000">
            Trellis Money
          </span>
        </div>
        {user ? <SignOutButton /> : <SignInButton />}
      </nav>
      <header className="text-center h-full items-center justify-center flex flex-col">
        <div className="translate-y-[-80%]">
          <h1 className="text-[2.5rem] font-bold text-tertiary-900  bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-transparent">
            Welcome to Trellis Money
          </h1>
            <p className="mt-2 mb-4 pb-10 bg-gradient-to-r from-tertiary-900 to-tertiary-700 bg-clip-text text-transparent">
            Your personal finance management tool to track investments across
            all accounts.
            </p>

          {user ? (
            <Link
              href="/dashboard"
              className="mt-4 px-8 py-4 bg-secondary-700 hover:bg-secondary-900 transition duration-300 text-white border-none rounded cursor-pointer"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className="mt-4 px-8 py-4  transition duration-300 rounded-lg bg-primary-700 hover:bg-primary-900 text-white border-none cursor-pointer "
            >
              Get Started
            </Link>
          )}
        </div>
      </header>
      <Footer />
    </div>
  );
}
