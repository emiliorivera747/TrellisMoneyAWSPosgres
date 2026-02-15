"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

export default function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <header className="flex h-[90vh] flex-col items-center justify-center text-center ">
      <div className=" -translate-y-[20%] sm:-translate-y-[20%] w-[86%] sm:w-[90%] flex flex-col justify-center items-center">
        <h1 className="bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-[1.8rem]  text-transparent sm:text-[3.2rem] tracking-wide font-bold pb-2">
          See the bigger picture
        </h1>
        <p className="mt-2 mb-1 bg-gradient-to-r from-tertiary-800 to-tertiary-600 bg-clip-text text-[0.9rem] text-transparent sm:text-[1.2rem]">
          Take control of your finances with Trellis Money
        </p>
        {isAuthenticated ? <AuthenticatedCTA /> : <WaitlistForm />}
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

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-10 flex flex-col items-center">
        <div className="flex h-[3.5rem] items-center justify-center rounded-[12px] px-[4rem] py-[1.05882rem] font-semibold text-tertiary-900 border border-tertiary-300">
          {message}
        </div>
        <p className="mt-2 pt-4 text-[0.8rem] text-tertiary-700 w-[18rem] font-light">
          We&apos;ll let you know when Trellis Money is ready.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="h-[3.5rem] w-[18rem] rounded-[12px] border border-tertiary-300 px-4 text-tertiary-900 placeholder:text-tertiary-500 focus:outline-none focus:ring-2 focus:ring-primary-700"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            boxShadow: `rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px`,
          }}
          className="flex h-[3.5rem] items-center justify-center rounded-[12px] hover:bg-tertiary-100 px-[2rem] py-[1.05882rem] transition delay-150 duration-300 ease-in-out font-semibold text-tertiary-900 border-none border-tertiary-300 disabled:opacity-50"
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 pt-2 text-[0.8rem] text-red-600 font-light">
          {message}
        </p>
      )}
      <p className="mt-2 pt-4 text-[0.8rem] text-tertiary-700 w-[18rem] font-light">
        Join the waitlist to get early access.
      </p>
    </div>
  );
}
