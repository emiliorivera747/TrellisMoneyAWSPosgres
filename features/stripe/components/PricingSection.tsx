"use client";
import React from "react";
import SubscriptionCard from "@/features/stripe/components/SubscriptionCard";
import { usePlans } from "@/hooks/react-query/stripe/StripeQueries";

// Types
import { StripePrice } from "@/features/stripe/types/price";

// Utils
import { getPriceDescription } from "@/features/stripe/utils/getPriceFromUnitAmount";

const PricingSection = () => {

  const { plansResponse, plansError, isPendingPlans } = usePlans();

  if (isPendingPlans) return <div>Loading...</div>;

  return (
    <section className=" h-auto sm:h-screen w-full flex flex-col border-t border-tertiary-300">
      <h1 className="text-center text-3xl font-bold text-tertiary-900  bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-transparent mt-[5rem]">
        Start your Trellis Money membership
      </h1>
      <p className="text-center text-md bg-gradient-to-r from-tertiary-800 to-tertiary-600 bg-clip-text text-transparent  mt-4">
        Manage your finances. Cancel anytime.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center  p-8 ">
        {plansResponse.map(
          ({ product, unit_amount, recurring }: StripePrice) => {
            
            const priceDescription = getPriceDescription(
              unit_amount,
              recurring?.interval
            );

            const features = product?.marketing_features?.map((feature) => {
              return feature.name;
            });
            return (
              <SubscriptionCard
                key={product?.name}
                title={product?.name}
                price={priceDescription}
                features={features ? features : []}
                payment_link={
                  process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK as string
                }
                footerDescription={`Auto-renews at ${priceDescription} Switch plans or cancel anytime.`}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default PricingSection;
