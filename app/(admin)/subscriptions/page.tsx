"use client";

/**
 * SubscriptionPage - Displays available subscription plans for users to choose from.
 * Fetches plans from Stripe and renders them as interactive cards.
 */

// Components
import SubscriptionCard from "@/features/subscription-plans/components/SubscriptionCard";
import {
  PrimaryHeader,
  SecondaryHeader,
} from "@/components/marketing/headers/Headers";

// Utils
import { getPriceDescription } from "@/features/subscription-plans/utils/getPriceFromUnitAmount";
import getFeaturesFromProducts from "@/features/subscription-plans/utils/getFeaturesFromProducts";
import sortByInterval from "@/features/subscription-plans/utils/sortByInterval";

// Hooks
import { usePlans } from "@/hooks/react-query/stripe/StripeQueries";

// Types
import { StripePrice } from "@/features/stripe/types/price";

// Skeletons
import PricingSectionSkeleton from "@/features/subscription-plans/components/skeleton/PricingSectionSkeleton";

const SubscriptionPage = () => {
  // Fetch subscription plans from Stripe via React Query
  const { plansResponse, plansError, isPendingPlans } = usePlans();

  // Show skeleton loader while plans are being fetched
  if (isPendingPlans) return <PricingSectionSkeleton />;

  return (
    <div className="h-screen overflow-scroll">
      {/* Page headers */}
      <PrimaryHeader label={"Choose a membership"} />
      <SecondaryHeader label={"Manage your finances. Cancel anytime."} />

      {/* Subscription cards container - displays plans sorted by billing interval */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-8">
        {plansResponse?.data
          .sort(sortByInterval) // Sort plans by interval (e.g., monthly before yearly)
          .map(({ product, unit_amount, recurring, id }: StripePrice) => {
            // Format the price for display (e.g., "$9.99/month")
            const priceDescription = getPriceDescription(
              unit_amount,
              recurring?.interval
            );

            // Extract feature list from product metadata
            const features = getFeaturesFromProducts(product);

            return (
              <SubscriptionCard
                key={id}
                title={product?.name}
                price={priceDescription}
                features={features ? features : []}
                subscription_link_url={`subscriptions?plan=${product?.metadata?.url_slug}`}
                footerDescription={`Auto-renews at ${priceDescription} Switch plans or cancel anytime.`}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SubscriptionPage;
