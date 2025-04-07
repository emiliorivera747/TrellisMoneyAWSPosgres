"use client";
import React from "react";
import SubscriptionCard from "@/features/stripe/components/SubscriptionCard";

const PricingSection = () => {
  return (
    <section className="h-screen w-full flex flex-col ">
      <h1 className="text-center text-4xl font-bold text-tertiary-900 mt-10">
        {" "}
        Start your Trellis Money membership
      </h1>
      <p className="text-center text-lg text-tertiary-700 mt-4">
        Manage your finances. Cancel anytime.
      </p>
      <div className="flex flex-row gap-6 items-center justify-center pt-8">
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
          payment_link={process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK as string}
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
          payment_link={process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK as string}
        />
      </div>
    </section>
  );
};

export default PricingSection;
