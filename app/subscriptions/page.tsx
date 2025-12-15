"use client";

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

import PricingSectionSkeleton from "@/features/subscription-plans/components/skeleton/PricingSectionSkeleton";

const SubscriptionPage = () => {
  const { plansResponse, plansError, isPendingPlans } = usePlans();
  if (isPendingPlans) return <PricingSectionSkeleton />;

  return (
    <div className="min-h-screen h-auto">
      <PrimaryHeader label={"Choose a membership"} />
      <SecondaryHeader label={"Manage your finances. Cancel anytime."} />
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 mt-8">
        {plansResponse?.data
          .sort(sortByInterval)
          .map(({ product, unit_amount, recurring, id }: StripePrice) => {
            const priceDescription = getPriceDescription(
              unit_amount,
              recurring?.interval
            );
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
