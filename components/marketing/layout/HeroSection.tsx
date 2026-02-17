"use client";

// React & Next.js imports
import { useState, FormEvent } from "react";
import Link from "next/link";

// UI component imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Props
interface HeroSectionProps {
  isAuthenticated: boolean;
}

// Main hero section - full-height banner with headline, subtitle, and CTA
export default function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <header className="flex h-[90vh] flex-col items-center justify-center text-center ">
      <div className=" -translate-y-[20%] sm:-translate-y-[20%] w-[86%] sm:w-[90%] flex flex-col justify-center items-center">
        {/* Headline */}
        <h1 className="bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-[1.8rem]  text-transparent sm:text-[3.2rem] tracking-wide font-bold pb-2">
          See the bigger picture
        </h1>
        {/* Subtitle */}
        <p className="mt-2 mb-1 bg-gradient-to-r from-tertiary-800 to-tertiary-600 bg-clip-text text-[0.9rem] text-transparent sm:text-[1.2rem]">
          Take control of your finances with Trellis Money
        </p>
        {/* CTA - show dashboard link if authenticated, otherwise waitlist */}
        {isAuthenticated ? <AuthenticatedCTA /> : <WaitlistCTA />}
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

function WaitlistCTA() {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="mt-10 flex flex-col items-center">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="h-[3.5rem] px-[4rem] rounded-[12px] font-semibold text-tertiary-900 border-tertiary-300 hover:bg-tertiary-100 transition delay-150 duration-300 ease-in-out"
        style={{
          boxShadow: `rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px`,
        }}
      >
        Join Waitlist
      </Button>
      <p className="mt-2 pt-4 text-[0.8rem] text-tertiary-700 w-[18rem] font-light">
        Join the waitlist to get early access.
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[12px]">
          <DialogHeader>
            <DialogTitle className="text-tertiary-900">
              Join the Waitlist
            </DialogTitle>
            <DialogDescription>
              Enter your email and we&apos;ll let you know when Trellis Money is
              ready.
            </DialogDescription>
          </DialogHeader>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <p className="font-semibold text-tertiary-900">{message}</p>
              <p className="text-[0.85rem] text-tertiary-600 font-light">
                We&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-[3rem] rounded-[12px]"
              />
              {status === "error" && (
                <p className="text-[0.8rem] text-red-600 font-light">
                  {message}
                </p>
              )}
              <Button
                type="submit"
                disabled={status === "loading"}
                className="h-[3rem] rounded-[12px] bg-tertiary-1000 text-white hover:bg-tertiary-900"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
