// Next and React
import React from "react";

export const dynamic = "force-dynamic";

// Components
import HeroSection from "@/features/home/components/HeroSection";
import Navbar from "@/components/nav-bars/NavBar";
import Footer from "@/components/footers/Footer";
import PricingSection from "@/features/stripe/components/PricingSection";

import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trellis Money - Seeing value where others don't",
  description:
    "Trellis Money is a personal finance management tool. Track investments across all accounts. Set goals and budgets. Get insights into your spending.",
};

/**
 *
 * Landing page for Trellis Money
 *
 */
export default async function Home() {
  
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-white h-auto">
      <Navbar isAuthenticated={!!user} />
      <HeroSection isAuthenticated={!!user} />
      <PricingSection />
      <Footer />
    </div>
  );
}
