"use client";
import React from "react";

// Types
import { StripePrice } from "@/features/stripe/types/price";

// Utils
import { getPriceDescription } from "@/features/stripe/utils/getPriceFromUnitAmount";

// Components
import PricingSectionSkeleton from "@/features/subscription-plans/components/skeleton/PricingSectionSkeleton";
import SubscriptionCard from "@/features/subscription-plans/components/SubscriptionCard";

// Hooks
import { usePlans } from "@/hooks/react-query/stripe/StripeQueries";

/**
 * PricingSection Component
 *
 * This component renders a pricing section for Trellis Money membership plans.
 * It fetches subscription plans using the `usePlans` hook and displays them
 * in a responsive layout. If the plans are still loading, it shows a skeleton
 * loader.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered PricingSection component.
 *
 * @remarks
 * - The component uses the `usePlans` hook to fetch subscription plans data.
 * - If the data is still loading, it renders the `PricingSectionSkeleton` component.
 * - Each subscription plan is displayed using the `SubscriptionCard` component.
 * - The `getPriceDescription` utility function is used to format the price and interval.
 *
 * @example
 * ```tsx
 * <PricingSection />
 * ```
 *
 * @dependencies
 * - `usePlans`: Custom hook to fetch subscription plans.
 * - `PricingSectionSkeleton`: Component to display a loading state.
 * - `SubscriptionCard`: Component to display individual subscription plans.
 * - `getPriceDescription`: Utility function to format price and interval.
 *
 * @env
 * - `NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK`: Environment variable for the payment link.
 *
 * @styles
 * - The component uses Tailwind CSS classes for styling.
 */
const PricingSection = () => {
  const { plansResponse, plansError, isPendingPlans } = usePlans();

  if (isPendingPlans) return <PricingSectionSkeleton />;

  return (
    <section className=" h-auto min-h-screen sm:h-screen w-full flex flex-col border-t border-tertiary-300">
      <h1 className="text-center text-3xl font-bold text-tertiary-900  bg-gradient-to-r from-tertiary-1000 to-tertiary-800 bg-clip-text text-transparent mt-[5rem]">
        Start your Trellis Money membership
      </h1>
      <p className="text-center text-md bg-gradient-to-r from-tertiary-800 to-tertiary-600 bg-clip-text text-transparent  mt-4">
        Manage your finances. Cancel anytime.
      </p>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {plansResponse.map(
          ({ product, unit_amount, recurring }: StripePrice) => {
            const priceDescription = getPriceDescription(
              unit_amount,
              recurring?.interval
            );

            const features = product?.marketing_features?.map(
              (feature) => feature.name
            );

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
