"use client";
import React from "react";
import SubscriptionCard from "@/features/stripe/components/SubscriptionCard";
import { usePlans } from "@/hooks/react-query/stripe/StripeQueries";

const PricingSection = () => {
  const { plansResponse, plansError, isPendingPlans } = usePlans();
  console.log("Plans response", plansResponse);

  return (
    <section className=" h-auto sm:h-screen w-full flex flex-col border-t border-tertiary-300">
      <h1 className="text-center text-3xl font-bold text-tertiary-900  bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-transparent mt-[5rem]">
        {" "}
        Start your Trellis Money membership
      </h1>
      <p className="text-center text-md bg-gradient-to-r from-tertiary-800 to-tertiary-600 bg-clip-text text-transparent  mt-4">
        Manage your finances. Cancel anytime.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center  p-8 ">
        <SubscriptionCard
          title="Premium Plus Monthly"
          price="$5/mo"
          features={[
            "Track your investments",
            "Set goals and budgets",
            "Get insights into your spending",
            "Get alerts and notifications",
            "Set projections and forecasts",
          ]}
          payment_link={
            process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK as string
          }
          footerDescription="Auto-renews at $5/mo. Switch plans or cancel anytime."
        />
        <SubscriptionCard
          title="Premium Plus Yearly"
          price="$50/yr"
          features={[
            "Track your investments",
            "Set goals and budgets",
            "Get insights into your spending",
            "Get alerts and notifications",
            "Set projections and forecasts",
          ]}
          payment_link={
            process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK as string
          }
          footerDescription="Auto-renews at $50/yr. Switch plans or cancel anytime."
        />
      </div>
    </section>
  );
};

export default PricingSection;
