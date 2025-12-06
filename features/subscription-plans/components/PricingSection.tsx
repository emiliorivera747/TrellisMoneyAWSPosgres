"use client";

// Types
import { StripePrice } from "@/features/stripe/types/price";

// Utils
import { getPriceDescription } from "@/features/stripe/utils/getPriceFromUnitAmount";

// Components
import PricingSectionSkeleton from "@/features/subscription-plans/components/skeleton/PricingSectionSkeleton";
import SubscriptionCard from "@/features/subscription-plans/components/SubscriptionCard";
import {
  PrimaryHeaderProps,
  SecondaryHeaderProps,
} from "@/types/components/marketing/headers";

// Hooks
import { usePlans } from "@/hooks/react-query/stripe/StripeQueries";
import {
  PrimaryHeader,
  SecondaryHeader,
} from "@/components/marketing/headers/Headers";

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
    <section className="h-auto min-h-screen sm:min-h-screen w-full flex flex-col border-t border-tertiary-300  pb-10">
      <PrimaryHeader label={"Start your Trellis Money membership"} />
      <SecondaryHeader label={"Manage your finances. Cancel anytime."} />

      <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-8">
        {plansResponse
          .sort((a: StripePrice, b: StripePrice) => {
            const order = { day: 1, week: 2, month: 3, year: 4 };
            const intervalA = a.recurring?.interval;
            const intervalB = b.recurring?.interval;
            return (
              ((intervalA && order[intervalA]) || 0) -
              ((intervalB && order[intervalB]) || 0)
            );
          })
          .map(({ product, unit_amount, recurring, id }: StripePrice) => {
            const priceDescription = getPriceDescription(
              unit_amount,
              recurring?.interval
            );

            const features = product?.marketing_features?.map(
              (feature) => feature.name
            );
            return (
              <SubscriptionCard
                key={id}
                title={product?.name}
                price={priceDescription}
                features={features ? features : []}
                price_id={id}
                footerDescription={`Auto-renews at ${priceDescription} Switch plans or cancel anytime.`}
              />
            );
          })}
      </div>
    </section>
  );
};

export default PricingSection;
